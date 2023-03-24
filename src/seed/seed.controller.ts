import { Controller, HttpCode, Post, HttpStatus, Inject } from '@nestjs/common';
import { Role } from 'src/libs/auth/role.decorator';
import { SeedCategoryOutput } from './dto/seed-category.dto';
import { ISeedService } from './interfaces/seed-service.interface';
import { I_SERVICE } from '../common/constants/interface.constants';

@Controller('seed')
export class SeedController {
  constructor(@Inject(I_SERVICE.I_SEED_SERVICE) private readonly seedService: ISeedService) {}

  @Post('/category')
  @Role(['Admin'])
  @HttpCode(HttpStatus.CREATED)
  async seedCategory(): Promise<SeedCategoryOutput> {
    return this.seedService.seedCategory();
  }
}
