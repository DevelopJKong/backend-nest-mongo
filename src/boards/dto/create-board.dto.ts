import { CoreOutput } from '../../common/dto/output.dto';
import { BoardInputDto } from '../../common/dto/board-input.dto';
import { IsString, IsIn } from 'class-validator';

export class CreateBoardInput extends BoardInputDto {
  @IsString({ message: '카테고리는 문자열이어야 합니다.' })
  @IsIn(['code', 'daily'], { message: '카테고리는 code,daily만 가능합니다.' })
  categoryName: string;
}

export class CreateBoardOutput extends CoreOutput {}
