import { IsEmail } from 'class-validator';
import { CoreOutput } from '../../common/dto/output.dto';

export class EmailCheckInput {
  @IsEmail({}, { message: '이메일 형식이 올바르지 않습니다.' })
  email: string;
}

export class EmailCheckOutput extends CoreOutput {}
