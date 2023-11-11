import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserChatSchema } from './schema/user-chat.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'UserChat',
        schema: UserChatSchema,
      },
    ]),
  ],
  providers: [],
  controllers: [],
  exports: [],
})
export class UserChatModule {}
