import { IsString, Matches, IsJWT, IsEmail } from 'class-validator';
import { Transform } from 'class-transformer';
import { CoreOutput } from '../../common/dto/output.dto';

export class LoginInput {
  @IsEmail({}, { message: '이메일 형식이 올바르지 않습니다.' })
  email: string;

  @IsString({ message: '비밀번호를 확인해주세요.' })
  @Transform(params => params.value.trim())
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@#$!%*?&]{5,20}$/, {
    message: '비밀번호는 영문 대소문자, 숫자, 특수문자를 포함한 5~20자리로 입력해주세요.',
  })
  password: string;
}

export class LoginOutput extends CoreOutput {
  @IsJWT({ message: '토큰이 올바르지 않습니다.' })
  token?: string;
}
