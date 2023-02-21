import { Injectable } from '@nestjs/common';
import { GetSeeBoardsOutput } from './dto/see-boards.dto';
import { Board, BoardDocument } from './entities/board.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetSeeBoardInput, GetSeeBoardOutput } from './dto/see-board.dto';
import { CreateBoardOutput, CreateBoardInput } from './dto/write-board.dto';
import { User, UserDocument } from '../users/entities/user.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectModel(Board.name) private boards: Model<BoardDocument>,
    @InjectModel(User.name) private users: Model<UserDocument>,
  ) {}
  async getSeeBoards(): Promise<GetSeeBoardsOutput> {
    try {
      const boards = await this.boards.find();

      return {
        ok: true,
        boards,
      };
    } catch (error) {
      return {
        ok: false,
        error: '게시글을 찾을 수 없습니다.',
      };
    }
  }
  async getSeeBoard({ id }: GetSeeBoardInput): Promise<GetSeeBoardOutput> {
    try {
      const board = await this.boards.findById(id);

      if (!board) {
        return {
          ok: false,
          error: '게시글을 찾을 수 없습니다.',
        };
      }

      return {
        ok: true,
        board,
      };
    } catch (error) {
      return {
        ok: false,
        error: '게시글을 찾을 수 없습니다.',
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
        return {
          ok: false,
          error: '유저를 찾을 수 없습니다.',
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
          error: '게시글을 작성할 수 없습니다.',
        };
      }

      newBoard.save();

      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: '게시글을 작성할 수 없습니다.',
      };
    }
  }
}
