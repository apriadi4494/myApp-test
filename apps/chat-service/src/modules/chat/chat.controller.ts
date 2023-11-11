import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { SUCCESS_MSG } from 'libs/src/common/constants';
import { ApiPaginatedResponse, AuthJwtGuard } from 'libs/src/common';
import { Chat } from './schema/chat.schema';
import { ViewMessageDto } from './dto/view-message.dto';
import { ListOptionDto } from 'libs/src/common/dto/query-options.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CustomBaseResponseInterceptor } from 'libs/src/common/interceptors';
import { SendMessageDto } from './dto/send-message.dto';
import { ClientProxy } from '@nestjs/microservices';

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

  @Get('viewMessages/:roomId')
  @ApiPaginatedResponse(Chat)
  async getChats(
    @Param() param: ViewMessageDto,
    @Query() query: ListOptionDto,
  ) {
    const result = await this.chatService.getChats(param.roomId, query);
    return { message: SUCCESS_MSG, result };
  }

  @Post('sendMessage/:roomId')
  @ApiPaginatedResponse(Chat)
  async sendMessage(
    @Body() payload: SendMessageDto,
    @Param() param: ViewMessageDto,
    @Req() req,
  ) {
    const token = req.headers.authorization.split(' ')[1];
    this.client.emit('SEND_MESSAGE', {
      data: { ...payload, sender: req.user.id, roomId: param.roomId },
      token,
    });

    return { message: SUCCESS_MSG, result: payload };
  }
}
