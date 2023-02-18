import { Injectable } from '@nestjs/common';
import { CreateUserOutput } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { LoginInput, LoginOutput } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '../libs/jwt/jwt.service';
import { EditProfileInput, EditProfileOutput } from './dto/edit-profile.dto';
import { EmailCheckInput, EmailCheckOutput } from './dto/email-check.dto';
import { CertificatePhoneInput, CertificatePhoneOutput } from './dto/certificate-phone.dto';
import axios from 'axios';
import { IAMPORT_TOKEN_URL } from '../common/constants/common.constants';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private users: Model<UserDocument>, private readonly jwtService: JwtService) {}

  async getFindById(userId: string) {
    try {
      const user = await this.users.findById(userId);
      return {
        ok: true,
        user,
      };
    } catch (error) {
      return {
        ok: false,
        error: '유저를 찾을 수 없습니다.',
      };
    }
  }

  async getFindByEmail(email: string) {
    try {
      const user = await this.users.findOne({ email });
      return {
        ok: true,
        user,
      };
    } catch (error) {
      return {
        ok: false,
        error: '유저를 찾을 수 없습니다.',
      };
    }
  }

  async createUser({
    name,
    username,
    email,
    password,
    confirmationPassword,
    region,
    phoneNum,
  }): Promise<CreateUserOutput> {
    try {
      if (password !== confirmationPassword) {
        return {
          ok: false,
          error: '비밀번호가 일치하지 않습니다.',
        };
      }
      const isValidationCheck = await this.users.exists({ $or: [{ email }, { username }] });

      if (isValidationCheck) {
        return {
          ok: false,
          error: '이미 존재하는 이메일 또는 아이디입니다.',
        };
      }

      const user = await this.users.create({
        name,
        username,
        email,
        password,
        region,
        phoneNum,
      });

      return {
        ok: true,
        user,
      };
    } catch (error) {
      return {
        ok: false,
        error: '회원가입에 실패했습니다.',
      };
    }
  }

  async postLogin({ email, password }: LoginInput): Promise<LoginOutput> {
    try {
      const user = await this.users.findOne({ email });

      if (!user) {
        return {
          ok: false,
          error: '존재하지 않는 이메일입니다.',
        };
      }

      const isValidationCheck = await bcrypt.compare(password, user.password);

      if (!isValidationCheck) {
        return {
          ok: false,
          error: '비밀번호가 일치하지 않습니다.',
        };
      }
      const token = this.jwtService.sign({ id: user._id.toString() });

      const refreshToken = this.jwtService.refreshSign({});

      const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

      user.refreshToken = refreshToken;

      await user.save();

      return {
        ok: true,
        token,
        refreshToken: hashedRefreshToken,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: '로그인에 실패했습니다.',
      };
    }
  }

  async putEditProfile({
    name,
    username,
    email,
    password,
    confirmationPassword,
    region,
    phoneNum,
  }: EditProfileInput): Promise<EditProfileOutput> {
    try {
      const searchParam: Array<{ email: string }> = [];

      const user = await this.users.findOne({ email });

      if (!user) {
        return {
          ok: false,
          error: '존재하지 않는 이메일입니다.',
        };
      }

      if (password) {
        if (password !== confirmationPassword) {
          return {
            ok: false,
            error: '비밀번호가 일치하지 않습니다.',
          };
        }
        user.password = password;
      }

      if (name) {
        user.name = name;
      }

      if (username) {
        user.username = username;
      }

      if (region) {
        user.region = region;
      }

      if (phoneNum) {
        user.phoneNum = phoneNum;
      }

      if (email) {
        if (user.email !== email) {
          searchParam.push({ email });
        }

        if (searchParam.length > 0) {
          const foundUser = await this.users.findOne({ $or: searchParam });

          if (foundUser && foundUser.email === user.email) {
            return {
              ok: false,
              error: '이미 존재하는 이메일입니다.',
            };
          }
        }
        user.email = email;
      }

      await user.save();

      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: '프로필 수정에 실패했습니다.',
      };
    }
  }
  async postEmailCheck({ email }: EmailCheckInput): Promise<EmailCheckOutput> {
    try {
      const user = await this.users.findOne({ email });
      if (user) {
        return {
          ok: false,
          error: '이미 존재하는 이메일입니다.',
        };
      }
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: '이메일 중복체크에 실패했습니다.',
      };
    }
  }

  async postCertificatePhone({ imp_uid }: CertificatePhoneInput): Promise<CertificatePhoneOutput> {
    try {
      const { data: getToken } = await axios.post(IAMPORT_TOKEN_URL, {
        imp_key: process.env.SHOP_API_KEY,
        imp_secret: process.env.SHOP_API_SECRET,
      });

      const { access_token } = getToken.response;

      const { data: getCertifications } = await axios.post(`https://api.iamport.kr/certifications/${imp_uid}`, {
        headers: { Authorization: access_token },
      });

      const certificationsInfo = getCertifications.response;

      const { phone: phoneNum } = certificationsInfo; // ! name, birth 사용할수있음
      const isUser = await this.users.exists({ phoneNum });

      if (isUser) {
        return {
          ok: false,
          error: '이미 존재하는 전화번호입니다.',
        };
      }

      return {
        ok: true,
        status: 'success',
      };
    } catch (error) {
      return {
        ok: false,
        error: '인증에 실패했습니다.',
      };
    }
  }
}
