import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { User, UserSchema } from '../users/entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Board, BoardSchema } from './entities/board.entity';
import { Comment, CommentSchema } from './entities/comment.entity';
import { Carousel, CarouselSchema } from './entities/carousel.entity';
import { Notice, NoticeSchema } from './entities/notice.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Board.name, schema: BoardSchema },
      { name: Comment.name, schema: CommentSchema },
      { name: Carousel.name, schema: CarouselSchema },
      { name: Notice.name, schema: NoticeSchema },
    ]),
  ],
  providers: [BoardsService],
  controllers: [BoardsController],
})
export class BoardsModule {}
