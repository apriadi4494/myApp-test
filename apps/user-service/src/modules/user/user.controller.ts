import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ApiBaseResponse, AuthJwtGuard } from 'libs/src/common';
import { SUCCESS_MSG } from 'libs/src/common/constants';
import { UserService } from './user.service';
import { CustomBaseResponseInterceptor } from 'libs/src/common/interceptors';
import { Request } from 'express';
import { UserProfile } from './schema/user-profile.schema';
import { CreateProfileDto } from './dto/create-profile.dto';

@UseGuards(AuthJwtGuard)
@Controller()
@ApiTags('User Services')
@ApiBearerAuth()
@UseInterceptors(CustomBaseResponseInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('getProfile')
  @ApiBaseResponse(UserProfile)
  async getOne(@Req() req: Request) {
    const result = await this.userService.getProfile(req);
    return { message: SUCCESS_MSG, result };
  }

  @Post('createProfile')
  @ApiBaseResponse(UserProfile)
  async createProfile(@Body() body: CreateProfileDto, @Req() req) {
    const result = await this.userService.createProfile(body, req);
    return { statusCode: 200, message: SUCCESS_MSG, result };
  }

  @Put('updateProfile')
  @ApiBaseResponse(UserProfile)
  async updateProfile(@Body() body: CreateProfileDto, @Req() req) {
    const result = await this.userService.updateProfile(body, req);
    return { statusCode: 200, message: SUCCESS_MSG, result };
  }
}
