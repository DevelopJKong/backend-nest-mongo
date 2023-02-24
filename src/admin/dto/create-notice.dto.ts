import { IsString } from 'class-validator';
import { CoreOutput } from '../../common/dto/output.dto';

export class CreateNoticeInput {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  navigateUrl: string;

  @IsString()
  noticeImgName: string;
}

export class CreateNoticeOutput extends CoreOutput {}
