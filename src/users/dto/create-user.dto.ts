import { IsPhoneNumber, IsString } from 'class-validator';
import { User } from '../entities/user.entity';
export class CreateUserInput {
  @IsString({ message: '이름을 입력해주세요.' })
  name: string;

  @IsString({ message: '이름을 입력해주세요.' })
  username: string;

  @IsString({ message: '이메일 형식이 올바르지 않습니다.' })
  email: string;

  @IsString({ message: '비밀번호를 확인해주세요.' })
  password: string;

  @IsString({ message: '비밀번호를 확인해주세요.' })
  confirmationPassword: string;

  @IsString({ message: '지역을 선택해주세요.' })
  region: string;

  @IsString()
  @IsPhoneNumber('KR', { message: '전화번호 형식이 올바르지 않습니다.' })
  phoneNum: string;
}

export class CreateUserOutput {
  ok: boolean;
  error?: string;
  user?: User;
}
