import { CONFIG_OPTIONS } from '../../common/constants/common.constants';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { LoggerModuleOptions } from './interfaces/logger.interface';
import { LoggerService } from './logger.service';
import { I_SERVICE } from '../../common/constants/interface.constants';

@Global()
@Module({})
export class LoggerModule {
  static forRoot(options: LoggerModuleOptions): DynamicModule {
    return {
      module: LoggerModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        {
          provide: I_SERVICE.I_LOGGER_SERVICE,
          useClass: LoggerService,
        },
      ],
      exports: [I_SERVICE.I_LOGGER_SERVICE],
    };
  }
}
