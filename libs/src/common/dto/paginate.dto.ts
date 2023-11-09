import { ApiProperty } from '@nestjs/swagger';
import { PageMetaDto } from './page-meta.dto';

export class PaginateDto<T> {
  @ApiProperty({ isArray: true })
  public content: T[];

  @ApiProperty({ type: () => PageMetaDto })
  public meta: PageMetaDto;

  constructor(content: T[], meta: PageMetaDto) {
    this.content = content;
    this.meta = meta;
  }
}
