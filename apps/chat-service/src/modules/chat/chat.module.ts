import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatSchema } from './schema/chat.schema';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatListener } from './chat.listener';
import { RmqClientConfigModule, SocketGateway } from '@app/main';
import { jwtConfigModule } from '@app/main/config/jwt/jwt-config';

@Module({
  imports: [
    jwtConfigModule,
    RmqClientConfigModule,
    MongooseModule.forFeature([
      {
        name: 'Chat',
        schema: ChatSchema,
      },
    ]),
  ],
  providers: [ChatService, SocketGateway],
  controllers: [ChatController, ChatListener],
  exports: [],
})
export class ChatModule {}
