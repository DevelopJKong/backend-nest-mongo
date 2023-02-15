import { CoreOutput } from '../../common/dto/output.dto';
import { IsEmail, IsString, Matches, IsPhoneNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class EditProfileInput {
  @IsString({ message: '이름을 입력해주세요.' })
  name: string;

  @IsString({ message: '닉네임을 입력해주세요.' })
  username: string;

  @IsEmail({}, { message: '이메일 형식이 올바르지 않습니다.' })
  email: string;

  @IsString({ message: '비밀번호를 확인해주세요.' })
  @Transform(params => params.value.trim())
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@#$!%*?&]{5,20}$/)
  password: string;

  @IsString({ message: '비밀번호를 확인해주세요.' })
  @Transform(params => params.value.trim())
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@#$!%*?&]{5,20}$/)
  confirmationPassword: string;

  @IsString({ message: '지역을 선택해주세요.' })
  region: string;

  @IsString({ message: '전화번호를 입력해주세요.' })
  @IsPhoneNumber('KR', { message: '전화번호 형식이 올바르지 않습니다.' })
  phoneNum: string;
}

export class EditProfileOutput extends CoreOutput {}
