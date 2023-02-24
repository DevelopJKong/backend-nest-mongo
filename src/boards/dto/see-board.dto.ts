import { IsOptional, IsString, IsObject } from 'class-validator';
import { Board } from '../entities/board.entity';
import { CoreOutput } from '../../common/dto/output.dto';

export class GetSeeBoardInput {
  @IsString()
  id: string;
}

export class GetSeeBoardOutput extends CoreOutput {
  @IsObject()
  @IsOptional()
  board?: Board;
}
