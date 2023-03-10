import { DocumentResult } from 'src/common/interfaces/common.interface';
import { Board } from 'src/boards/entities/board.entity';
export interface IDocBoard extends Board, DocumentResult<Board> {}
