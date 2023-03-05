import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsOptional } from 'class-validator';
import { User } from '../entities/user.entity';
import { CoreOutput } from '../../common/dto/output.dto';
import { USER_SUCCESS_RESPONSE } from '../../common/constants/swagger/user/user-success-response.constant';
export class FindByEmailOutput extends CoreOutput {
  @ApiProperty({ example: USER_SUCCESS_RESPONSE.getFindByEmail.example.user })
  @IsObject({ message: '유저는 객체이어야 합니다.' })
  @IsOptional()
  user?: User;
}
