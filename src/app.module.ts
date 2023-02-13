import { Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { MiddlewareConsumer } from '@nestjs/common/interfaces/middleware/middleware-consumer.interface';
import { JwtMiddleware } from './libs/jwt/jwt.middleware';
import { JwtModule } from './libs/jwt/jwt.module';
import { LoggerModule } from './libs/logger/logger.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
      }),
    }),
    MongooseModule.forRoot(process.env.DB_HOST, {
      connectionFactory: connection => {
        connection.plugin(require('mongoose-autopopulate')); // eslint-disable-line
        console.log('Mongoose connection created');
        return connection;
      },
    }),
    JwtModule.forRoot({
      jwtPrivateKey: process.env.JWT_PRIVATE_KEY,
      jwtExpiresSec: process.env.JWT_EXPIRES_SEC,
      refreshExpiresSec: process.env.REFRESH_EXPIRES_SEC,
    }),
    LoggerModule.forRoot({
      nodeEnv: process.env.NODE_ENV,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes({
      path: '/users/*',
      method: RequestMethod.ALL,
    });
  }
}
