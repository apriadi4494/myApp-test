import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserChatSchema } from './schema/user-chat.schema';
import { UserChatListener } from './user-chat.listener';
import { UserChatService } from './user-chat.service';
import { jwtConfigModule } from 'libs/src/config/jwt/jwt-config';

@Module({
  imports: [
    jwtConfigModule,
    MongooseModule.forFeature([
      {
        name: 'UserChat',
        schema: UserChatSchema,
      },
    ]),
  ],
  providers: [UserChatService],
  controllers: [UserChatListener],
  exports: [],
})
export class UserChatModule {}
