import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { isNotEmpty } from 'class-validator';

@Injectable()
export class AuthLocalGuard extends AuthGuard('auth-local') {
  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: any,
  ): TUser {
    const request = context.switchToHttp().getRequest();
    const { password, username, email } = request.body;

    if (err || !user) {
      if (!isNotEmpty(username))
        throw new UnauthorizedException('Username tidak boleh kosong');

      if (!isNotEmpty(password))
        throw new UnauthorizedException('password tidak boleh kosong');

      if (!isNotEmpty(email))
        throw new UnauthorizedException('email tidak boleh kosong');

      throw new UnauthorizedException(err.message);
    }
    return user;
  }
}
