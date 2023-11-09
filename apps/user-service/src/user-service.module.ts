import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_NAME, DB_URL } from 'libs/src';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

const modules = [UserModule, AuthModule];

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(DB_URL, {
      dbName: DB_NAME,
    }),
    ...modules,
  ],
})
export class UserServiceModule {}
