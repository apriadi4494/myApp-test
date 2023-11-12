import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class ListOptionDto {
  @ApiProperty({ required: false })
  public search?: string;

  @ApiProperty({ default: 1 })
  @Type(() => Number)
  @IsInt()
  public page: number;

  @ApiProperty({ default: 5 })
  @Type(() => Number)
  @IsInt()
  public limit: number;
}
