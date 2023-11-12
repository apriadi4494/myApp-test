import { Controller, UseGuards } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { UserChatService } from './user-chat.service';
import { MessageUserChatDto } from './dto/create-user-chat.dto';
import { ListenerGuard } from '@app/main';

@Controller()
@UseGuards(ListenerGuard)
export class UserChatListener {
  constructor(private readonly userChatService: UserChatService) {}

  @MessagePattern('CREATE_USER_CHAT')
  async createUserChat(
    @Payload() message: MessageUserChatDto,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    await this.userChatService.createUserChat(message.data);

    channel.ack(originalMsg);
  }

  @MessagePattern('UPDATE_USER_CHAT')
  async updateUserChat(
    @Payload() message: MessageUserChatDto,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    await this.userChatService.createUpdateUserChat(message.data);

    channel.ack(originalMsg);
  }
}
