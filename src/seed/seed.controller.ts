import { Controller, HttpCode, Post, HttpStatus, Inject } from '@nestjs/common';
import { Role } from 'src/libs/auth/role.decorator';
import { SeedCategoryOutput } from './dto/seed-category.dto';
import { ISeedService } from './interfaces/seed-service.interface';

@Controller('seed')
export class SeedController {
  constructor(@Inject('ISeedService') private readonly seedService: ISeedService) {}

  @Post('/category')
  @Role(['Admin'])
  @HttpCode(HttpStatus.CREATED)
  async seedCategory(): Promise<SeedCategoryOutput> {
    return this.seedService.seedCategory();
  }
}
