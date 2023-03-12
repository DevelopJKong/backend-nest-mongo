import { CoreOutput } from '../../common/dto/output.dto';
import { IsString } from 'class-validator';

export class CreateCarouselInput {
  @IsString({ message: '이미지는 문자열이어야 합니다.' })
  carouselImgName: string;

  @IsString({ message: '제목은 문자열이어야 합니다.' })
  title: string;

  @IsString({ message: '링크는 문자열이어야 합니다.' })
  link: string;
}

export class CreateCarouselOutput extends CoreOutput {}
