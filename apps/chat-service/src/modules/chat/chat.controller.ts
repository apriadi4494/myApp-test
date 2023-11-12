import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { Chat } from './schema/chat.schema';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { ViewMessageDto } from './dto/view-message.dto';
import { SendMessageDto } from './dto/send-message.dto';
import {
  AuthJwtGuard,
  CustomBaseResponseInterceptor,
  ApiPaginatedResponse,
  SUCCESS_MSG,
} from '@app/main';

@UseGuards(AuthJwtGuard)
@Controller()
@ApiTags('Chat Services')
@ApiBearerAuth()
@UseInterceptors(CustomBaseResponseInterceptor)
export class ChatController {
  constructor(
    @Inject('PUBLISHER') private readonly client: ClientProxy,
    private readonly chatService: ChatService,
  ) {}

  @Get('viewMessages')
  @ApiPaginatedResponse(Chat)
  async getChats(@Query() query: ViewMessageDto) {
    const result = await this.chatService.getChats(query);
    return { message: SUCCESS_MSG, result };
  }

  @Post('sendMessage')
  @ApiPaginatedResponse(Chat)
  async sendMessage(@Body() payload: SendMessageDto, @Req() req) {
    const token = req.headers.authorization.split(' ')[1];
    this.client.emit('SEND_MESSAGE', {
      data: { ...payload, sender: req.user.id, roomId: payload.roomId },
      token,
    });

    return { message: SUCCESS_MSG, result: payload };
  }
}
