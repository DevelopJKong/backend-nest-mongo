import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { Verification, VerificationSchema } from './entities/verification.entity';
import { I_SERVICE } from 'src/common/constants/interface.constants';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Verification.name, schema: VerificationSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [
    {
      provide: I_SERVICE.I_USERS_SERVICE,
      useClass: UsersService,
    },
  ],
  exports: [I_SERVICE.I_USERS_SERVICE],
})
export class UsersModule {}
