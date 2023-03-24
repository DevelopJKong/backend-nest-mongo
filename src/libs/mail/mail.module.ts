import { MailModuleOptions } from './interface/mail.interface';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { CONFIG_OPTIONS } from 'src/common/constants/common.constants';
import { I_SERVICE } from '../../common/constants/interface.constants';

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
          provide: I_SERVICE.I_MAIL_SERVICE,
          useClass: MailService,
        },
      ],
      exports: [I_SERVICE.I_MAIL_SERVICE],
    };
  }
}
