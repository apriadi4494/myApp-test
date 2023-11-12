import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { ObjectId } from 'mongodb';

import { Chat } from './schema/chat.schema';
import { SendMessageDto } from './dto/send-message.dto';
import { ViewMessageDto } from './dto/view-message.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name)
    private readonly chatModel: mongoose.Model<Chat>,
  ) {}

  async getChats(
    query: ViewMessageDto,
  ): Promise<{ roomId: string | Types.ObjectId; data: Chat[] }> {
    try {
      const roomId = query.roomId ?? new ObjectId();
      const options: any = {
        $and: [{ roomId }],
      };

      if (query.search) options.$and.push({ message: query.search });

      const chats = await this.chatModel
        .find(options)
        .populate('sender')
        .sort({
          createdAt: 'asc',
        })
        .limit(query.limit)
        .exec();

      return {
        roomId,
        data: chats,
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async createChat(payload: SendMessageDto) {
    try {
      const save = await this.chatModel.create(payload);
      return save;
    } catch (err) {
      throw err.message;
    }
  }
}
