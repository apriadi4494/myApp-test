import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_URL_USER } from 'libs/src';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

const modules = [UserModule, AuthModule];

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(DB_URL_USER),
    ...modules,
  ],
})
export class UserServiceModule {}
