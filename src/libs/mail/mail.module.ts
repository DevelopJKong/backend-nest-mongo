import { MailModuleOptions } from './interface/mail.interface';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { CONFIG_OPTIONS } from 'src/common/constants/common.constants';

@Module({})
@Global()
export class MailModule {
  static forRoot(options: MailModuleOptions): DynamicModule {
    return {
      module: MailModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        {
          provide: 'IMailService',
          useClass: MailService,
        },
      ],
      exports: ['IMailService'],
    };
  }
}
