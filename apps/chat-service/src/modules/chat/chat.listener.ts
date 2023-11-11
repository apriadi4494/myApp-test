import { Controller, UseGuards } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { ListenerGuard } from 'libs/src/common/guard/listener.guard';
import { ChatService } from './chat.service';
import { MessageChatDto } from './dto/send-message.dto';

@Controller()
@UseGuards(ListenerGuard)
export class ChatListener {
  constructor(private readonly chatService: ChatService) {}

  @MessagePattern('SEND_MESSAGE')
  async updateUserChat(
    @Payload() message: MessageChatDto,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    await this.chatService.createChat(message.data);

    channel.ack(originalMsg);
  }
}
