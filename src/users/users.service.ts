import { Injectable, HttpStatus } from '@nestjs/common';
import { CreateUserOutput } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { LoginInput, LoginOutput } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '../libs/jwt/jwt.service';
import { EditProfileInput, EditProfileOutput } from './dto/edit-profile.dto';
import { EmailCheckInput, EmailCheckOutput } from './dto/email-check.dto';
import { CertificatePhoneInput, CertificatePhoneOutput } from './dto/certificate-phone.dto';
import axios from 'axios';
import { IAMPORT_TOKEN_URL } from '../common/constants/common.constants';
import { userSuccess } from '../common/constants/success.constants';
import { commonError, userError } from '../common/constants/error.constants';
import { Verification, VerificationDocument } from './entities/verification.entity';
import { MailService } from 'src/mail/mail.service';
import { CertificateEmailInput } from './dto/certificate-email.dto';
import * as mongoose from 'mongoose';
import { Response } from 'express';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly users: Model<UserDocument>,
    @InjectModel(Verification.name) private readonly verifications: Model<VerificationDocument>,
    @InjectConnection() private readonly connection: mongoose.Connection,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async getFindById(userId: string) {
    try {
      const user = await this.users.findById(userId);
      //* success
      return {
        ok: true,
        message: { text: userSuccess.getFindById.text, statusCode: HttpStatus.OK },
        user,
      };
    } catch (error) {
      return {
        ok: false,
        error: new Error(error),
        message: { text: commonError.extraError.text, statusCode: HttpStatus.INTERNAL_SERVER_ERROR },
      };
    }
  }

  async getFindByEmail(email: string) {
    try {
      const user = await this.users.findOne({ email });
      return {
        ok: true,
        message: {
          text: userSuccess.getFindByEmail.text,
          statusCode: HttpStatus.OK,
        },
        user,
      };
    } catch (error) {
      return {
        ok: false,
        error: new Error(error),
        message: { text: commonError.extraError.text, statusCode: HttpStatus.INTERNAL_SERVER_ERROR },
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
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      if (password !== confirmationPassword) {
        return {
          ok: false,
          error: new Error(userError.notMatchedPasswords.error),
          message: {
            text: userError.notMatchedPasswords.text,
            statusCode: HttpStatus.UNAUTHORIZED,
          },
        };
      }
      const isValidationCheck = await this.users.exists({ $or: [{ email }, { username }] });

      if (isValidationCheck) {
        return {
          ok: false,
          error: '이미 존재하는 이메일 또는 아이디입니다.',
        };
      }

      const createUserValue = new this.users({
        name,
        username,
        email,
        password,
        region,
        phoneNum,
      });

      const user = await createUserValue.save({ session });

      const createVerificationValue = new this.verifications({
        user,
      });

      const verification = await createVerificationValue.save({ session });

      await this.mailService.sendMail(this.mailService.mailVar(user.email, user.username, verification.code));

      await session.commitTransaction();

      return {
        ok: true,
        message: {
          text: userSuccess.postJoin.text,
          statusCode: HttpStatus.OK,
        },
      };
    } catch (error) {
      await session.abortTransaction();
      return {
        ok: false,
        error: new Error(error),
        message: { text: commonError.extraError.text, statusCode: HttpStatus.INTERNAL_SERVER_ERROR },
      };
    } finally {
      await session.endSession();
    }
  }

  async postLogin({ email, password }: LoginInput): Promise<LoginOutput> {
    try {
      const user = await this.users.findOne({ email });

      if (!user) {
        return {
          ok: false,
          error: new Error(userError.notExistUser.error),
          message: {
            text: userError.notExistUser.text,
            statusCode: HttpStatus.BAD_REQUEST,
          },
        };
      }

      const isValidationCheck = await bcrypt.compare(password, user.password);

      if (!isValidationCheck) {
        return {
          ok: false,
          error: new Error(userError.notExistUser.error),
          message: {
            text: userError.notExistUser.text,
            statusCode: HttpStatus.BAD_REQUEST,
          },
        };
      }

      if (!user.isVerified) {
        return {
          ok: false,
          error: new Error(userError.notVerifiedUser.error),
          message: {
            text: userError.notVerifiedUser.text,
            statusCode: HttpStatus.BAD_REQUEST,
          },
        };
      }
      const token = this.jwtService.sign({ id: user._id });

      const refreshToken = this.jwtService.refreshSign({});

      const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

      user.refreshToken = refreshToken;

      await user.save();

      return {
        ok: true,
        token,
        refreshToken: hashedRefreshToken,
        message: {
          text: userSuccess.postLogin.text,
          statusCode: HttpStatus.OK,
        },
      };
    } catch (error) {
      return {
        ok: false,
        error: new Error(error),
        message: { text: commonError.extraError.text, statusCode: HttpStatus.INTERNAL_SERVER_ERROR },
      };
    }
  }
  async postCertificateEmail({ code, email }: CertificateEmailInput, response: Response): Promise<void> {
    try {
      const user = await this.users.findOne({ email });

      if (!user) {
        return response.redirect(`http://localhost:3000/login?error=${userError.notExistUser.error}`);
      }
      const verification = await this.verifications.findOne({ code });

      if (!verification) {
        return response.redirect(`http://localhost:3000/login?error=${userError.notExistVerification.error}`);
      }

      user.isVerified = true;
      user.save();
      return response.redirect('http://localhost:3000/login?success=true');
    } catch (error) {
      return response.redirect(`http://localhost:3000/login?error=${commonError.extraError.error}`);
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
          error: new Error(userError.notExistUser.error),
          message: {
            text: userError.notExistUser.text,
            statusCode: HttpStatus.BAD_REQUEST,
          },
        };
      }

      if (password) {
        if (password !== confirmationPassword) {
          return {
            ok: false,
            error: new Error(userError.notMatchedPasswords.error),
            message: {
              text: userError.notMatchedPasswords.text,
              statusCode: HttpStatus.UNAUTHORIZED,
            },
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
            // ! 유저가 이미 존재하는 유저를 입력 했을 경우 에러
            return {
              ok: false,
              error: new Error(userError.existUser.error),
              message: {
                text: userError.existUser.text,
                statusCode: HttpStatus.BAD_REQUEST,
              },
            };
          }
        }
        user.email = email;
      }

      await user.save();

      return {
        ok: true,
        message: {
          text: userSuccess.putEditProfile.text,
          statusCode: HttpStatus.OK,
        },
      };
    } catch (error) {
      return {
        ok: false,
        error: new Error(error),
        message: { text: commonError.extraError.text, statusCode: HttpStatus.INTERNAL_SERVER_ERROR },
      };
    }
  }
  async postEmailCheck({ email }: EmailCheckInput): Promise<EmailCheckOutput> {
    try {
      const user = await this.users.findOne({ email });
      if (user) {
        // ! 이미 존재하는 유저 일 경우
        return {
          ok: false,
          error: new Error(userError.existUser.error),
          message: {
            text: userError.existUser.text,
            statusCode: HttpStatus.BAD_REQUEST,
          },
        };
      }
      return {
        ok: true,
        message: {
          text: userSuccess.postEmailCheck.text,
          statusCode: HttpStatus.OK,
        },
      };
    } catch (error) {
      return {
        ok: false,
        error: new Error(error),
        message: { text: commonError.extraError.text, statusCode: HttpStatus.INTERNAL_SERVER_ERROR },
      };
    }
  }

  async postCertificatePhone({ imp_uid }: CertificatePhoneInput): Promise<CertificatePhoneOutput> {
    try {
      const STATUS = {
        SUCCESS: 'success',
        FAIL: 'fail',
      } as const;

      const { data: getToken } = await axios.post(IAMPORT_TOKEN_URL, {
        imp_key: process.env.SHOP_API_KEY,
        imp_secret: process.env.SHOP_API_SECRET,
      });

      const { access_token } = getToken.response;

      const { data: getCertifications } = await axios.get(`https://api.iamport.kr/certifications/${imp_uid}`, {
        headers: { Authorization: access_token },
      });

      const certificationsInfo = getCertifications.response;

      const { phone: phoneNum } = certificationsInfo; // ! name, birth 사용할수있음
      const isUser = await this.users.exists({ phoneNum });

      if (isUser) {
        return {
          ok: false,
          status: STATUS.FAIL,
          error: new Error(userError.existUser.error),
          message: {
            text: userError.existUser.text,
            statusCode: HttpStatus.BAD_REQUEST,
          },
        };
      }

      return {
        ok: true,
        status: STATUS.SUCCESS,
        message: {
          text: userSuccess.postCertification.text,
          statusCode: HttpStatus.OK,
        },
      };
    } catch (error) {
      // ! extraError
      return {
        ok: false,
        error: new Error(error),
        message: { text: commonError.extraError.text, statusCode: HttpStatus.INTERNAL_SERVER_ERROR },
      };
    }
  }
}
