import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Carousel, CarouselSchema } from './entities/carousel.entity';
import { NoticeSchema, Notice } from './entities/notice.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Carousel.name, schema: CarouselSchema },
      { name: Notice.name, schema: NoticeSchema },
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
