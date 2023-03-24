import { JwtService } from './jwt.service';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/constants/common.constants';
import { JwtModuleOption } from './interfaces/jwt.interface';
import { I_SERVICE } from '../../common/constants/interface.constants';

@Module({})
@Global()
export class JwtModule {
  static forRoot(options: JwtModuleOption): DynamicModule {
    return {
      module: JwtModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        {
          provide: I_SERVICE.I_JWT_SERVICE,
          useClass: JwtService,
        },
      ],
      exports: [I_SERVICE.I_JWT_SERVICE],
    };
  }
}
