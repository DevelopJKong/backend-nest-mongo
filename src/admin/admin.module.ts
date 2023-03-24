import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Carousel, CarouselSchema } from './entities/carousel.entity';
import { NoticeSchema, Notice } from './entities/notice.entity';
import { I_SERVICE } from '../common/constants/interface.constants';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Carousel.name, schema: CarouselSchema },
      { name: Notice.name, schema: NoticeSchema },
    ]),
  ],
  controllers: [AdminController],
  providers: [
    {
      provide: I_SERVICE.I_ADMIN_SERVICE,
      useClass: AdminService,
    },
  ],
  exports: [I_SERVICE.I_ADMIN_SERVICE],
})
export class AdminModule {}
