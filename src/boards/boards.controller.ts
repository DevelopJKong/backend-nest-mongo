import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { HttpCode } from '@nestjs/common/decorators/http/http-code.decorator';
import { GetSeeBoardsOutput } from './dto/see-boards.dto';
import { GetSeeBoardInput } from './dto/see-board.dto';
import { CreateBoardOutput, CreateBoardInput } from './dto/create-board.dto';
import { AuthUser } from 'src/libs/auth/auth-user.decorator';
import { User } from '../users/entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { boardOptions, CarouselOptions } from '../common/utils/multer.options';
import { EditBoardInput, EditBoardOutput } from './dto/edit-board.dto';
import { Role } from '../libs/auth/role.decorator';
import { CreateCategoryInput, CreateCategoryOutput } from './dto/create-category.dto';
import { CreateCarouselInput } from './dto/create-carousel.dto';
import { SeeCarouselsOutput } from './dto/see-carousels.dto';
import { I_SERVICE } from '../common/constants/interface.constants';
import { IBoardsService } from './interface/boards-service.interface';

@Controller('boards')
export class BoardsController {
  constructor(@Inject(I_SERVICE.I_BOARDS_SERVICE) private readonly boardsService: IBoardsService) {}

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

@Controller('carousels')
export class CarouselController {
  constructor(@Inject(I_SERVICE.I_BOARDS_SERVICE) private readonly boardsService: IBoardsService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getSeeCarousels(): Promise<SeeCarouselsOutput> {
    return this.boardsService.getSeeCarousels();
  }

  @Post('/create')
  @Role(['Admin'])
  @UseInterceptors(FileInterceptor('image', CarouselOptions))
  @HttpCode(HttpStatus.CREATED)
  async postCreateCarousel(
    @Body() createCarouselInput: CreateCarouselInput,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<CreateCategoryOutput> {
    return this.boardsService.postCreateCarousel(createCarouselInput, file);
  }
}
