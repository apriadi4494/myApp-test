import { ApiProperty } from '@nestjs/swagger';
import { ListOptionDto } from 'libs/src/common/dto/query-options.dto';

export class ViewMessageDto extends ListOptionDto {
  @ApiProperty({ required: false })
  roomId: string;
}
