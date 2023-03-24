import { Controller, Get, Inject } from '@nestjs/common';
import { IAppService } from './app-service.interface';
import { I_SERVICE } from './common/constants/interface.constants';

@Controller()
export class AppController {
  constructor(@Inject(I_SERVICE.I_APP_SERVICE) private readonly appService: IAppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
