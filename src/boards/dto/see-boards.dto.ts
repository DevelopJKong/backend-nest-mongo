import { IsArray, IsOptional } from 'class-validator';
import { CoreOutput } from '../../common/dto/output.dto';
import { Board } from '../entities/board.entity';
export class GetSeeBoardsOutput extends CoreOutput {
  @IsArray()
  @IsOptional()
  boards?: Board[];
}
