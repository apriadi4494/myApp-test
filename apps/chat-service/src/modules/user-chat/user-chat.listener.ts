import { Controller, UseGuards } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { UserChatService } from './user-chat.service';
import { MessageUserChatDto } from './dto/create-user-chat.dto';
import { ListenerGuard } from 'libs/src/common/guard/listener.guard';

@Controller()
@UseGuards(ListenerGuard)
export class OrderPosListener {
  constructor(private readonly userChatService: UserChatService) {}

  @MessagePattern('CREATE_USER')
  async listenAndTakeStockFromCfs(
    @Payload() message: MessageUserChatDto,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    await this.userChatService.createUserChat(message.data);

    channel.ack(originalMsg);
  }
}
