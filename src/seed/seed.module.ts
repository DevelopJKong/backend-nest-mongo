import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from 'src/boards/entities/category.entity';
import { SeedService } from './seed.service';
import { I_SERVICE } from '../common/constants/interface.constants';

@Module({
  imports: [MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }])],
  controllers: [SeedController],
  providers: [
    {
      provide: I_SERVICE.I_SEED_SERVICE,
      useClass: SeedService,
    },
  ],
  exports: [I_SERVICE.I_SEED_SERVICE],
})
export class SeedModule {}
