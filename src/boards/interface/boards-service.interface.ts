import { GetSeeBoardsOutput } from '../dto/see-boards.dto';
import { GetSeeBoardInput, GetSeeBoardOutput } from '../dto/see-board.dto';
import { CreateBoardOutput, CreateBoardInput } from '../dto/write-board.dto';
import { EditBoardInput, EditBoardOutput } from '../dto/edit-board.dto';
import { DeleteBoardOutput } from './../dto/delete-board.dto';
export interface IBoardsService {
  getSeeBoards(): Promise<GetSeeBoardsOutput>;
  getSeeBoard(getSeeBoardInput: GetSeeBoardInput): Promise<GetSeeBoardOutput>;
  postCreateBoard(
    postCreateBoard: CreateBoardInput,
    userId: string,
    file: Express.Multer.File,
  ): Promise<CreateBoardOutput>;
  putEditBoard(
    editBoardInput: EditBoardInput,
    userId: string,
    boardId: string,
    file: Express.Multer.File,
  ): Promise<EditBoardOutput>;
  deleteBoard(userId: string, id: number): Promise<DeleteBoardOutput>;
}
