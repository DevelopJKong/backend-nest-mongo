import { SeedCategoryOutput } from '../dto/seed-category.dto';

export interface ISeedService {
  seedCategory(): Promise<SeedCategoryOutput>;
}
