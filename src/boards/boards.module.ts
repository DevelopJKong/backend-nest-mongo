import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController, CarouselController } from './boards.controller';
import { User, UserSchema } from '../users/entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Board, BoardSchema } from './entities/board.entity';
import { BoardComment, BoardCommentSchema } from './entities/board-comment.entity';
import { CategorySchema, Category } from './entities/category.entity';
import { Carousel, CarouselSchema } from '../admin/entities/carousel.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Board.name, schema: BoardSchema },
      { name: BoardComment.name, schema: BoardCommentSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Carousel.name, schema: CarouselSchema },
    ]),
  ],
  providers: [BoardsService],
  controllers: [BoardsController, CarouselController],
})
export class BoardsModule {}
