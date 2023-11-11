import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { jwtConfigModule } from 'libs/src/config/jwt/jwt-config';
import { ChatSchema } from './schema/chat.schema';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { RmqClientConfigModule } from 'libs/src/config/rabbitmq/rabbitmq-config';
import { ChatListener } from './chat.listener';

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
  providers: [ChatService],
  controllers: [ChatController, ChatListener],
  exports: [],
})
export class ChatModule {}
