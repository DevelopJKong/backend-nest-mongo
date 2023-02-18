import { IsOptional, IsString } from 'class-validator';
import { CoreOutput } from '../../common/dto/output.dto';

export class CertificatePhoneInput {
  @IsString({ message: '전화번호를 입력해주세요.' })
  imp_uid: string;
}

export class CertificatePhoneOutput extends CoreOutput {
  @IsString()
  @IsOptional()
  status?: string;
}
