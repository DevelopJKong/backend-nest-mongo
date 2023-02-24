import { IsOptional, IsArray } from 'class-validator';
import { CoreOutput } from '../../common/dto/output.dto';
import { Notice } from '../entities/notice.entity';

export class SeeNoticesOutput extends CoreOutput {
  @IsArray()
  @IsOptional()
  notices?: Notice[];
}
