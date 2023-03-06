import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HttpHealthIndicator, HealthCheck, MongooseHealthIndicator } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: MongooseHealthIndicator,
  ) {}

  @Get('/')
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('domain', 'http://localhost:5000/api'),
      () => this.db.pingCheck('database'),
    ]);
  }
}
