import { IsArray, IsOptional } from 'class-validator';
import { CoreOutput } from '../../common/dto/output.dto';
import { Carousel } from '../../admin/entities/carousel.entity';

export class SeeCarouselsOutput extends CoreOutput {
  @IsArray({ message: '케러셀은 배열이여야 합니다' })
  @IsOptional()
  carousels?: Carousel[];
}
