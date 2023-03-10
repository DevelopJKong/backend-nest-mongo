import { Controller, HttpCode, Post, HttpStatus } from '@nestjs/common';
import { Role } from 'src/libs/auth/role.decorator';
import { SeedService } from './seed.service';
import { SeedCategoryOutput } from './dto/seed-category.dto';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post('/category')
  @Role(['Admin'])
  @HttpCode(HttpStatus.CREATED)
  async seedCategory(): Promise<SeedCategoryOutput> {
    return this.seedService.seedCategory();
  }
}
