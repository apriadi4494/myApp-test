import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_URL_CHAT, JwtStrategy } from 'libs/src';
import { UserChatModule } from './modules/user-chat/user-chat.module';
import { ChatModule } from './modules/chat/chat.module';
import { jwtConfigModule } from '@app/main/config/jwt/jwt-config';

const modules = [UserChatModule, ChatModule];

@Module({
  imports: [
    jwtConfigModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(DB_URL_CHAT),
    ...modules,
  ],
  providers: [JwtStrategy],
})
export class ChatServiceModule {}
