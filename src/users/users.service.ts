import { Injectable } from '@nestjs/common';
import { CreateUserOutput } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private users: Model<UserDocument>) {}
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
      const IsValidationCheck = await this.users.exists({ $or: [{ email }, { username }] });

      if (IsValidationCheck) {
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
}
