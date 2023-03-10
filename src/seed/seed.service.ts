import { Injectable, HttpStatus } from '@nestjs/common';
import { SeedCategoryOutput } from './dto/seed-category.dto';
import { COMMON_ERROR } from '../../common/constants/error.constants';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from '../../boards/entities/category.entity';
import { CategoryDocument } from '../../../dist/boards/entities/category.entity';
import { Model } from 'mongoose';
import { SEED_SUCCESS } from '../../common/constants/success.constants';

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
