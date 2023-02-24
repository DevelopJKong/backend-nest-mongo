import { Injectable, HttpStatus } from '@nestjs/common';
import { GetSeeBoardsOutput } from './dto/see-boards.dto';
import { Board, BoardDocument } from './entities/board.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetSeeBoardInput, GetSeeBoardOutput } from './dto/see-board.dto';
import { CreateBoardOutput, CreateBoardInput } from './dto/write-board.dto';
import { User, UserDocument } from '../users/entities/user.entity';
import { EditBoardInput, EditBoardOutput } from './dto/edit-board.dto';
import { boardSuccess } from '../common/constants/success.constants';
import { boardError, commonError, userError } from '../common/constants/error.constants';
import { DeleteBoardOutput } from './dto/delete-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectModel(Board.name) private readonly boards: Model<BoardDocument>,
    @InjectModel(User.name) private readonly users: Model<UserDocument>,
  ) {}
  async getSeeBoards(): Promise<GetSeeBoardsOutput> {
    try {
      const boards = await this.boards.find();

      return {
        ok: true,
        message: {
          text: boardSuccess.getSeeBoards.text,
          statusCode: HttpStatus.OK,
        },
        boards,
      };
    } catch (error) {
      return {
        ok: false,
        error: new Error(error),
        message: { text: boardSuccess.getSeeBoards.text, statusCode: HttpStatus.INTERNAL_SERVER_ERROR },
      };
    }
  }
  async getSeeBoard({ id }: GetSeeBoardInput): Promise<GetSeeBoardOutput> {
    try {
      const board = await this.boards.findById(id);

      if (!board) {
        return {
          ok: false,
          error: new Error(boardError.notExistBoard.error),
          message: {
            text: boardError.notExistBoard.text,
            statusCode: HttpStatus.NOT_FOUND,
          },
        };
      }

      return {
        ok: true,
        message: {
          text: boardSuccess.getSeeBoard.text,
          statusCode: HttpStatus.OK,
        },
        board,
      };
    } catch (error) {
      return {
        ok: false,
        error: new Error(error),
        message: { text: commonError.extraError.text, statusCode: HttpStatus.INTERNAL_SERVER_ERROR },
      };
    }
  }
  async postWriteBoard(
    { title, content, boardImgName }: CreateBoardInput,
    userId: string,
    file: Express.Multer.File,
  ): Promise<CreateBoardOutput> {
    try {
      const user = await this.users.findById(userId);
      if (!user) {
        // ! 유저가 존재 하지 않을 경우
        return {
          ok: false,
          error: new Error(userError.notExistUser.error),
          message: {
            text: userError.notExistUser.text,
            statusCode: HttpStatus.BAD_REQUEST,
          },
        };
      }

      const newBoard = await this.boards.create({
        title,
        content,
        boardImgName,
        boardImgSize: file.size,
        boardImgPath: file.path,
        views: 0,
        rating: 0,
        owner: user,
      });

      if (!newBoard) {
        return {
          ok: false,
          error: new Error(boardError.createFailedError.error),
          message: {
            text: boardError.createFailedError.text,
            statusCode: HttpStatus.BAD_REQUEST,
          },
        };
      }

      newBoard.save();

      return {
        ok: true,
        message: {
          text: boardSuccess.postCreateBoard.text,
          statusCode: HttpStatus.OK,
        },
      };
    } catch (error) {
      // ! extraError
      return {
        ok: false,
        error: new Error(error),
        message: { text: commonError.extraError.text, statusCode: HttpStatus.INTERNAL_SERVER_ERROR },
      };
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
          error: new Error(userError.notExistUser.error),
          message: {
            text: userError.notExistUser.text,
            statusCode: HttpStatus.BAD_REQUEST,
          },
        };
      }

      const board = await this.boards.findById(boardId);
      if (!board) {
        // ! 게시물이 존재 하지 않을 경우
        return {
          ok: false,
          error: new Error(boardError.notExistBoard.error),
          message: {
            text: boardError.notExistBoard.text,
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
          text: boardSuccess.putEditBoard.text,
          statusCode: HttpStatus.OK,
        },
      };
    } catch (error) {
      return {
        ok: false,
        error: new Error(error),
        message: { text: commonError.extraError.text, statusCode: HttpStatus.INTERNAL_SERVER_ERROR },
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
          error: new Error(userError.notExistUser.error),
          message: {
            text: userError.notExistUser.text,
            statusCode: HttpStatus.BAD_REQUEST,
          },
        };
      }
      await this.boards.findByIdAndDelete(id);

      return {
        ok: true,
        message: {
          text: boardSuccess.deleteBoard.text,
          statusCode: HttpStatus.OK,
        },
      };
    } catch (error) {
      return {
        ok: false,
        error: new Error(error),
        message: { text: commonError.extraError.text, statusCode: HttpStatus.INTERNAL_SERVER_ERROR },
      };
    }
  }
}
