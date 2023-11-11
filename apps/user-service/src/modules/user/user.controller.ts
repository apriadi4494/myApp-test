import {
  Body,
  Controller,
  Get,
  Headers,
  Inject,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { ApiBaseResponse, AuthJwtGuard } from 'libs/src/common';
import { SUCCESS_MSG } from 'libs/src/common/constants';
import { UserService } from './user.service';
import { CustomBaseResponseInterceptor } from 'libs/src/common/interceptors';
import { UserProfile } from './schema/user-profile.schema';
import {
  CreateProfileDto,
  CreateProfileFileDto,
} from './dto/create-profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { media } from 'libs/src/config/storage/storage-config';
import {
  UpdateProfileDto,
  UpdateProfileFileDto,
} from './dto/update-profile.dto';
import { ClientProxy } from '@nestjs/microservices';

@UseGuards(AuthJwtGuard)
@Controller()
@ApiTags('User Services')
@ApiBearerAuth()
@UseInterceptors(CustomBaseResponseInterceptor)
export class UserController {
  constructor(
    @Inject('PUBLISHER') private readonly client: ClientProxy,
    private readonly userService: UserService,
  ) {}

  @Get('getProfile')
  @ApiBaseResponse(UserProfile)
  async getOne(@Req() req) {
    const result = await this.userService.getProfile(req.user.id);
    return { message: SUCCESS_MSG, result };
  }

  @Post('createProfile')
  @ApiBaseResponse(UserProfile)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file', { storage: media('user') }))
  async createProfile(
    @Body() body: CreateProfileFileDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req,
    @Headers('authorization') authorization: string,
  ) {
    const data: CreateProfileDto = JSON.parse(body.data);
    const result = await this.userService.createProfile(
      data,
      req.user.id,
      file,
    );

    const token = authorization.split(' ')[1];
    this.client.emit('CREATE_USER_CHAT', {
      data: { ...result, documentId: result.id },
      token,
    });

    return { statusCode: 200, message: SUCCESS_MSG, result };
  }

  @Put('updateProfile')
  @ApiBaseResponse(UserProfile)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file', { storage: media('user') }))
  async updateProfile(
    @Body() body: UpdateProfileFileDto,
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
    @Headers('authorization') authorization: string,
  ) {
    const data: UpdateProfileDto = JSON.parse(body.data);

    const result = await this.userService.updateProfile(
      data,
      req.user.id,
      file,
    );

    const token = authorization.split(' ')[1];
    this.client.emit('UPDATE_USER_CHAT', {
      data: {
        name: result.name,
        imageUrl: result.imageUrl,
        documentId: result.id,
      },
      token,
    });
    return { statusCode: 200, message: SUCCESS_MSG, result };
  }
}
