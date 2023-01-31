import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest-rest-mongo', {
      connectionFactory: (connection) => {
        connection.plugin(require('mongoose-autopopulate')); // eslint-disable-line
        console.log('Mongoose connection created');
        return connection;
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
