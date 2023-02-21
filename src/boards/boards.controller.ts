import { Body, Controller, Get, HttpStatus, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { HttpCode } from '@nestjs/common/decorators/http/http-code.decorator';
import { GetSeeBoardsOutput } from './dto/see-boards.dto';
import { GetSeeBoardInput } from './dto/see-board.dto';
import { CreateBoardOutput, CreateBoardInput } from './dto/write-board.dto';
import { AuthUser } from 'src/libs/auth/auth-user.decorator';
import { User } from '../users/entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { boardOptions } from '../common/utils/multer.options';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getSeeBoards(): Promise<GetSeeBoardsOutput> {
    return this.boardsService.getSeeBoards();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getSeeBoard(@Param() { id }: GetSeeBoardInput): Promise<GetSeeBoardsOutput> {
    return this.boardsService.getSeeBoard({ id });
  }

  @Post('/write')
  @UseInterceptors(FileInterceptor('image', boardOptions))
  async postWriteBoard(
    @Body() writeBoardInput: CreateBoardInput,
    @AuthUser() authUser: User,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<CreateBoardOutput> {
    return this.boardsService.postWriteBoard(writeBoardInput, authUser.userId, file);
  }
}
