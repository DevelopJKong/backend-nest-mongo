import { IsOptional, IsString } from 'class-validator';
import { Board } from '../entities/board.entity';
import { CoreOutput } from '../../common/dto/output.dto';

export class GetSeeBoardInput {
  @IsString()
  id: string;
}

export class GetSeeBoardOutput extends CoreOutput {
  @IsString()
  @IsOptional()
  board?: Board;
  //
}
