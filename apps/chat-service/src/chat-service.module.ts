import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_URL_CHAT } from 'libs/src';
import { UserChatModule } from './modules/user-chat/user-chat.module';
import { jwtConfigModule } from 'libs/src/config/jwt/jwt-config';

const modules = [UserChatModule];

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    jwtConfigModule,
    MongooseModule.forRoot(DB_URL_CHAT),
    ...modules,
  ],
})
export class ChatServiceModule {}
