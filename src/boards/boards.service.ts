import { Injectable } from '@nestjs/common';
import { GetSeeBoardsOutput } from './dto/get-see-boards.dto';
import { BoardDocument } from '../../dist/boards/entities/board.entity';
import { Board } from './entities/board.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BoardsService {
  constructor(@InjectModel(Board.name) private boards: Model<BoardDocument>) {}
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
}
