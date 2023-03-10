import { GetSeeBoardsOutput } from '../dto/see-boards.dto';
import { GetSeeBoardInput, GetSeeBoardOutput } from '../dto/see-board.dto';
import { CreateBoardOutput, CreateBoardInput } from '../dto/create-board.dto';
import { EditBoardInput, EditBoardOutput } from '../dto/edit-board.dto';
import { DeleteBoardOutput } from './../dto/delete-board.dto';
import { CreateCategoryOutput, CreateCategoryInput } from '../dto/create-category.dto';
export interface IBoardsService {
  getSeeBoards(): Promise<GetSeeBoardsOutput>;
  getSeeBoard(getSeeBoardInput: GetSeeBoardInput): Promise<GetSeeBoardOutput>;
  postCreateCategory(postCreateCategory: CreateCategoryInput): Promise<CreateCategoryOutput>;
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
