import { IsIn, IsString } from 'class-validator';
import { CoreOutput } from '../../common/dto/output.dto';
export class CreateCategoryInput {
  @IsString({ message: '카테고리는 문자열이어야 합니다.' })
  @IsIn(['code', 'daily'], { message: '카테고리는 code,daily만 가능합니다.' })
  categoryName: string;
}

export class CreateCategoryOutput extends CoreOutput {}
