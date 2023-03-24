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
import { BoardsModule } from './boards/boards.module';
import { CommunitiesModule } from './communities/communities.module';
import { AdminModule } from './admin/admin.module';
import { HealthModule } from './health/health.module';
import { MailModule } from './libs/mail/mail.module';
import { SeedModule } from './seed/seed.module';
import { I_SERVICE } from './common/constants/interface.constants';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PROD_HOST: Joi.string().required(),
        NODE_ENV: Joi.string().required(),
        JWT_PRIVATE_KEY: Joi.string().required(),
        JWT_EXPIRES_SEC: Joi.string().required(),
        REFRESH_EXPIRES_SEC: Joi.string().required(),
        SHOP_PID_CODE: Joi.string().required(),
        SHOP_API_KEY: Joi.string().required(),
        SHOP_API_SECRET: Joi.string().required(),
        BACKEND_URL: Joi.string().required(),
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
    MailModule.forRoot({
      service: process.env.MAIL_SERVICE,
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: Boolean(process.env.MAIL_SECURE),
      auth: {
        user: process.env.MAIL_GOOGLE_MAIL,
        pass: process.env.MAIL_GOOGLE_PASSWORD,
      },
    }),
    UsersModule,
    BoardsModule,
    CommunitiesModule,
    AdminModule,
    HealthModule,
    SeedModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: I_SERVICE.I_APP_SERVICE,
      useClass: AppService,
    },
  ],
  exports: [I_SERVICE.I_APP_SERVICE],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes({
      path: '/users/*',
      method: RequestMethod.ALL,
    });
    consumer.apply(JwtMiddleware).forRoutes({
      path: '/admin/*',
      method: RequestMethod.ALL,
    });
    consumer
      .apply(JwtMiddleware)
      .exclude(
        { path: '/boards/carousels', method: RequestMethod.GET }, //
      )
      .forRoutes({
        path: '/boards/*',
        method: RequestMethod.ALL,
      });
    consumer.apply(JwtMiddleware).forRoutes({
      path: '/communities/*',
      method: RequestMethod.ALL,
    });
    consumer.apply(JwtMiddleware).forRoutes({
      path: '/seed/*',
      method: RequestMethod.ALL,
    });
  }
}
