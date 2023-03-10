import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { HttpCode } from '@nestjs/common/decorators/http/http-code.decorator';
import { GetSeeBoardsOutput } from './dto/see-boards.dto';
import { GetSeeBoardInput } from './dto/see-board.dto';
import { CreateBoardOutput, CreateBoardInput } from './dto/create-board.dto';
import { AuthUser } from 'src/libs/auth/auth-user.decorator';
import { User } from '../users/entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { boardOptions } from '../common/utils/multer.options';
import { EditBoardInput, EditBoardOutput } from './dto/edit-board.dto';
import { Role } from '../libs/auth/role.decorator';
import { CreateCategoryInput, CreateCategoryOutput } from './dto/create-category.dto';

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

  @Post('/create')
  @Role(['User', 'Admin'])
  @UseInterceptors(FileInterceptor('image', boardOptions))
  @HttpCode(HttpStatus.CREATED)
  async postWriteBoard(
    @Body() writeBoardInput: CreateBoardInput,
    @AuthUser() authUser: User,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<CreateBoardOutput> {
    return this.boardsService.postCreateBoard(writeBoardInput, authUser.userId, file);
  }

  @Put('/edit')
  @Role(['User', 'Admin'])
  @UseInterceptors(FileInterceptor('image', boardOptions))
  @HttpCode(HttpStatus.OK)
  async editBoard(
    @AuthUser() authUser: User,
    @Body() editBoardInput: EditBoardInput,
    @Query() { id }: { id: string },
    @UploadedFile() file: Express.Multer.File,
  ): Promise<EditBoardOutput> {
    return this.boardsService.putEditBoard(editBoardInput, authUser.userId, id, file);
  }

  @Delete('/delete')
  @Role(['User', 'Admin'])
  @HttpCode(HttpStatus.OK)
  async deleteBoard(@AuthUser() authUser: User, @Query() { id }: { id: string }) {
    return this.boardsService.deleteBoard(authUser.userId, Number(id));
  }

  @Post('/category/create')
  @Role(['Admin'])
  @HttpCode(HttpStatus.CREATED)
  async postCreateCategory(@Body() createCategoryInput: CreateCategoryInput): Promise<CreateCategoryOutput> {
    return this.boardsService.postCreateCategory(createCategoryInput);
  }
}
