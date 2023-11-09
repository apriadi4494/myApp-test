import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_NAME, DB_URL } from 'libs/src';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(DB_URL, {
      dbName: DB_NAME,
    }),
  ],
})
export class UserServiceModule {}
