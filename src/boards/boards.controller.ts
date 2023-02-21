import { Controller, Get, HttpStatus } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { HttpCode } from '@nestjs/common/decorators/http/http-code.decorator';
import { GetSeeBoardsOutput } from './dto/get-see-boards.dto';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getSeeBoards(): Promise<GetSeeBoardsOutput> {
    return this.boardsService.getSeeBoards();
  }
}
