import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class ListOptionDto {
  @ApiProperty({ required: false })
  public search?: string;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  public page: number;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  public limit: number;
}
