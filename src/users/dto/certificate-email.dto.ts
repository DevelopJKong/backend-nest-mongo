import { IsString, IsEmail } from 'class-validator';
import { CoreOutput } from '../../common/dto/output.dto';

export class CertificateEmailInput {
  @IsString({ message: '코드를 입력 해 주세요.' })
  code: string;

  @IsEmail({}, { message: '이메일을 입력 해 주세요.' })
  email: string;
}

export class CertificateEmailOutput extends CoreOutput {}
