import { IsString } from 'class-validator';
import { CoreOutput } from '../../common/dto/output.dto';

export class CreateBoardInput {
  @IsString({ message: '제목은 문자열이어야 합니다.' })
  title: string;

  @IsString({ message: '내용은 문자열이어야 합니다.' })
  content: string;

  @IsString({ message: '이미지 이름은 문자열이어야 합니다.' })
  boardImgName: string;
}

export class CreateBoardOutput extends CoreOutput {}
