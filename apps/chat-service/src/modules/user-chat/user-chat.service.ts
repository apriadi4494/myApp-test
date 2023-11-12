import mongoose from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { UserChat } from './schema/user-chat.schema';
import { CreateUserChatDto } from './dto/create-user-chat.dto';

@Injectable()
export class UserChatService {
  constructor(
    @InjectModel(UserChat.name)
    private readonly userChatModel: mongoose.Model<UserChat>,
  ) {}

  async createUserChat(data: CreateUserChatDto): Promise<UserChat> {
    try {
      const create = await this.userChatModel.create(data);
      return create;
    } catch (err) {
      throw err.message;
    }
  }

  async createUpdateUserChat(data: CreateUserChatDto): Promise<UserChat> {
    try {
      const create = await this.userChatModel.findOneAndUpdate(
        { id: data._id },
        data,
      );
      return create;
    } catch (err) {
      throw err.message;
    }
  }
}
