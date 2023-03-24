import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from 'src/boards/entities/category.entity';
import { SeedService } from './seed.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }])],
  controllers: [SeedController],
  providers: [
    {
      provide: 'ISeedService',
      useClass: SeedService,
    },
  ],
  exports: ['ISeedService'],
})
export class SeedModule {}
