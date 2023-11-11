import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SendMessageDto {
  @ApiProperty()
  @IsString()
  receiver: string;

  @ApiProperty()
  @IsString()
  roomId: string;

  @ApiProperty()
  @IsString()
  message: string;

  sender: string;
}

export class MessageChatDto {
  data: SendMessageDto;

  token: string;
}
