import {
  Body,
  Controller,
  HttpCode,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ApiBaseResponse, AuthLocalGuard } from 'libs/src/common';
import { LoginDto } from './dto/login-dto';
import { SUCCESS_MSG } from 'libs/src/common/constants';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerDto';
import { UserService } from '../user/user.service';
import { CustomBaseResponseInterceptor } from 'libs/src/common/interceptors';
import { User } from '../user/schema/user.schema';

@Controller()
@ApiTags('Auth Services')
@ApiBearerAuth()
@UseInterceptors(CustomBaseResponseInterceptor)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(AuthLocalGuard)
  @Post('login')
  @HttpCode(200)
  @ApiBaseResponse(User)
  async login(@Body() body: LoginDto, @Request() req) {
    const result = await this.authService.login(req.user.id);
    return { statusCode: 200, message: SUCCESS_MSG, result };
  }

  @Post('register')
  @HttpCode(200)
  async register(@Body() body: RegisterDto) {
    const result = await this.userService.create(body);
    return { statusCode: 200, message: SUCCESS_MSG, result };
  }
}
