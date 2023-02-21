import { IsString } from 'class-validator';

export class BoardInputDto {
  @IsString({ message: '제목은 문자열이어야 합니다.' })
  title: string;

  @IsString({ message: '내용은 문자열이어야 합니다.' })
  content: string;

  @IsString({ message: '이미지 이름은 문자열이어야 합니다.' })
  boardImgName: string;
}
