import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  birthday: string;

  @ApiProperty()
  @IsNumber()
  height: number;

  @ApiProperty()
  @IsNumber()
  weight: number;

  @ApiProperty()
  @IsArray()
  interests: string[];
}

export class UpdateProfileFileDto {
  @ApiProperty({ required: false })
  @ApiProperty({ type: 'string', format: 'binary' })
  file: Express.Multer.File;

  @ApiProperty({ type: UpdateProfileDto })
  @IsString()
  data: string;
}
