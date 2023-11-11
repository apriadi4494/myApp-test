import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';

import { Chat } from './schema/chat.schema';
import { ListOptionDto } from 'libs/src/common/dto/query-options.dto';
import { SendMessageDto } from './dto/send-message.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name)
    private readonly chatModel: mongoose.Model<Chat>,
  ) {}

  async getChats(roomId: string, query: ListOptionDto): Promise<Chat[]> {
    try {
      const options: any = {
        $and: [{ roomId }],
      };

      if (query.search) options.$and.push({ message: query.search });

      const chats = await this.chatModel
        .find(options)
        .populate({ path: 'sender', foreignField: 'documentId' })
        .sort({
          createdAt: 'asc',
        })
        .limit(query.limit)
        .exec();

      return chats;
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
