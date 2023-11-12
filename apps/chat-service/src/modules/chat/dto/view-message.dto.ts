import { ListOptionDto } from '@app/main';
import { ApiProperty } from '@nestjs/swagger';

export class ViewMessageDto extends ListOptionDto {
  @ApiProperty({ required: false })
  roomId: string;
}
