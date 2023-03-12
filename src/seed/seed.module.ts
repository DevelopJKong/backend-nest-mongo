import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from 'src/boards/entities/category.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }])],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
