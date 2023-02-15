import { IsString, IsEmail } from 'class-validator';

export class UserInputDto {
  @IsString({ message: '이름이 정확하지 않습니다.' })
  name: string;

  @IsString({ message: '아이디가 정확하지 않습니다.' })
  username: string;

  @IsEmail({}, { message: '이메일이 정확하지 않습니다.' })
  email: string;

  @IsString({ message: '비밀번호가 정확하지 않습니다.' })
  password: string;
}
