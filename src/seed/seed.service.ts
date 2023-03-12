import { Injectable, HttpStatus } from '@nestjs/common';
import { SeedCategoryOutput } from './dto/seed-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from '../boards/entities/category.entity';
import { SEED_SUCCESS } from '../common/constants/success.constants';
import { COMMON_ERROR } from '../common/constants/error.constants';

@Injectable()
export class SeedService {
  constructor(@InjectModel(Category.name) private readonly categories: Model<CategoryDocument>) {}
  async seedCategory(): Promise<SeedCategoryOutput> {
    try {
      await this.categories.insertMany([{ categoryName: 'daily' }, { categoryName: 'code' }]);

      return {
        ok: true,
        message: {
          text: SEED_SUCCESS.seedCategory.text,
          statusCode: HttpStatus.OK,
        },
      };
    } catch (error) {
      // ! extraError
      return {
        ok: false,
        error: new Error(error),
        message: { text: COMMON_ERROR.extraError.text, statusCode: HttpStatus.INTERNAL_SERVER_ERROR },
      };
    }
  }
}
