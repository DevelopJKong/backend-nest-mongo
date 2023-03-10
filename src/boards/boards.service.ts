import { Injectable, HttpStatus } from '@nestjs/common';
import { GetSeeBoardsOutput } from './dto/see-boards.dto';
import { Board, BoardDocument } from './entities/board.entity';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetSeeBoardInput, GetSeeBoardOutput } from './dto/see-board.dto';
import { CreateBoardOutput, CreateBoardInput } from './dto/create-board.dto';
import { User, UserDocument } from '../users/entities/user.entity';
import { EditBoardInput, EditBoardOutput } from './dto/edit-board.dto';
import { BOARD_SUCCESS } from '../common/constants/success.constants';
import { BOARD_ERROR, COMMON_ERROR, USER_ERROR } from '../common/constants/error.constants';
import { DeleteBoardOutput } from './dto/delete-board.dto';
import { IBoardsService } from './interface/boards-service.interface';
import * as mongoose from 'mongoose';
import { Category, CategoryDocument } from './entities/category.entity';
import { CreateCategoryInput, CreateCategoryOutput } from './dto/create-category.dto';
import { IDocBoard } from './interface/boards-result.interface';

@Injectable()
export class BoardsService implements IBoardsService {
  constructor(
    @InjectModel(Board.name) private readonly boards: Model<BoardDocument>,
    @InjectModel(Category.name) private readonly categories: Model<CategoryDocument>,
    @InjectModel(User.name) private readonly users: Model<UserDocument>,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}
  async getSeeBoards(): Promise<GetSeeBoardsOutput> {
    try {
      const boards = (await this.boards.find().populate('category')).map((item: IDocBoard) => {
        let resultBoard: Board;
        const categoryName = item.category.categoryName;
        if (item?._doc) {
          delete item._doc.category;
          resultBoard = { ...item._doc, categoryName };
        }
        return resultBoard;
      });

      return {
        ok: true,
        message: {
          text: BOARD_SUCCESS.getSeeBoards.text,
          statusCode: HttpStatus.OK,
        },
        boards,
      };
    } catch (error) {
      return {
        ok: false,
        error: new Error(error),
        message: { text: BOARD_SUCCESS.getSeeBoards.text, statusCode: HttpStatus.INTERNAL_SERVER_ERROR },
      };
    }
  }
  async getSeeBoard({ id }: GetSeeBoardInput): Promise<GetSeeBoardOutput> {
    try {
      const board = await this.boards.findById(id).populate('category');

      if (!board) {
        return {
          ok: false,
          error: new Error(BOARD_ERROR.notExistBoard.error),
          message: {
            text: BOARD_ERROR.notExistBoard.text,
            statusCode: HttpStatus.NOT_FOUND,
          },
        };
      }

      return {
        ok: true,
        message: {
          text: BOARD_SUCCESS.getSeeBoard.text,
          statusCode: HttpStatus.OK,
        },
        board,
      };
    } catch (error) {
      return {
        ok: false,
        error: new Error(error),
        message: { text: COMMON_ERROR.extraError.text, statusCode: HttpStatus.INTERNAL_SERVER_ERROR },
      };
    }
  }
  async postCreateCategory({ categoryName }: CreateCategoryInput): Promise<CreateCategoryOutput> {
    try {
      const category = await this.categories.findOne({ categoryName });

      if (category) {
        return {
          ok: false,
          error: new Error(BOARD_ERROR.existCategory.error),
          message: {
            text: BOARD_ERROR.existCategory.text,
            statusCode: HttpStatus.BAD_REQUEST,
          },
        };
      }

      await this.categories.create({
        categoryName,
      });

      return {
        ok: true,
        message: {
          text: BOARD_SUCCESS.postCreateCategory.text,
          statusCode: HttpStatus.CREATED,
        },
      };
    } catch (error) {
      // ! extraError
      return {
        ok: false,
        error: new Error(error),
        message: { text: COMMON_ERROR.extraError.text, statusCode: HttpStatus.INTERNAL_SERVER_ERROR },
      };
    }
  }

  async postCreateBoard(
    { title, content, boardImgName, categoryName }: CreateBoardInput,
    userId: string,
    file: Express.Multer.File,
  ): Promise<CreateBoardOutput> {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      const user = await this.users.findOne({ where: { userId } }, '-password');
      if (!user) {
        // ! 유저가 존재 하지 않을 경우
        return {
          ok: false,
          error: new Error(USER_ERROR.notExistUser.error),
          message: {
            text: USER_ERROR.notExistUser.text,
            statusCode: HttpStatus.BAD_REQUEST,
          },
        };
      }
      const category = await this.categories.findOne({ categoryName });

      if (!category) {
        return {
          ok: false,
          error: new Error(BOARD_ERROR.notExistCategory.error),
          message: {
            text: BOARD_ERROR.notExistCategory.text,
            statusCode: HttpStatus.BAD_REQUEST,
          },
        };
      }

      const createBoardValue = new this.boards({
        title,
        content,
        boardImgName,
        boardImgSize: file.size,
        boardImgPath: file.path,
        views: 0,
        rating: 0,
        owner: user,
        category,
      });

      const newBoard = await createBoardValue.save({ session });

      if (!newBoard) {
        return {
          ok: false,
          error: new Error(BOARD_ERROR.createFailedError.error),
          message: {
            text: BOARD_ERROR.createFailedError.text,
            statusCode: HttpStatus.BAD_REQUEST,
          },
        };
      }

      user.boards.push(newBoard);
      await user.save({ session });

      await session.commitTransaction();
      return {
        ok: true,
        message: {
          text: BOARD_SUCCESS.postCreateBoard.text,
          statusCode: HttpStatus.OK,
        },
      };
    } catch (error) {
      await session.abortTransaction();
      // ! extraError
      return {
        ok: false,
        error: new Error(error),
        message: { text: COMMON_ERROR.extraError.text, statusCode: HttpStatus.INTERNAL_SERVER_ERROR },
      };
    } finally {
      session.endSession();
    }
  }

  async putEditBoard(
    { title, content, boardImgName }: EditBoardInput,
    userId: string,
    boardId: string,
    file: Express.Multer.File,
  ): Promise<EditBoardOutput> {
    try {
      const user = await this.users.findById(userId);
      if (!user) {
        // ! 유저가 존재 하지 않을 경우
        return {
          ok: false,
          error: new Error(USER_ERROR.notExistUser.error),
          message: {
            text: USER_ERROR.notExistUser.text,
            statusCode: HttpStatus.BAD_REQUEST,
          },
        };
      }

      const board = await this.boards.findById(boardId);
      if (!board) {
        // ! 게시물이 존재 하지 않을 경우
        return {
          ok: false,
          error: new Error(BOARD_ERROR.notExistBoard.error),
          message: {
            text: BOARD_ERROR.notExistBoard.text,
            statusCode: HttpStatus.NOT_FOUND,
          },
        };
      }

      if (title) {
        board.title = title;
      }

      if (content) {
        board.content = content;
      }

      if (boardImgName) {
        board.boardImgName = boardImgName;
      }

      if (file) {
        if (file.size) {
          board.boardImgSize = file.size;
        }

        if (file.path) {
          board.boardImgPath = file.path;
        }
      }

      await board.save();

      // * success
      return {
        ok: true,
        message: {
          text: BOARD_SUCCESS.putEditBoard.text,
          statusCode: HttpStatus.OK,
        },
      };
    } catch (error) {
      return {
        ok: false,
        error: new Error(error),
        message: { text: COMMON_ERROR.extraError.text, statusCode: HttpStatus.INTERNAL_SERVER_ERROR },
      };
    }
  }
  async deleteBoard(userId: string, id: number): Promise<DeleteBoardOutput> {
    try {
      const user = await this.users.findById(userId);
      if (!user) {
        // ! 유저가 존재 하지 않을 경우
        return {
          ok: false,
          error: new Error(USER_ERROR.notExistUser.error),
          message: {
            text: USER_ERROR.notExistUser.text,
            statusCode: HttpStatus.BAD_REQUEST,
          },
        };
      }
      await this.boards.findByIdAndDelete(id);

      return {
        ok: true,
        message: {
          text: BOARD_SUCCESS.deleteBoard.text,
          statusCode: HttpStatus.OK,
        },
      };
    } catch (error) {
      return {
        ok: false,
        error: new Error(error),
        message: { text: COMMON_ERROR.extraError.text, statusCode: HttpStatus.INTERNAL_SERVER_ERROR },
      };
    }
  }
}
