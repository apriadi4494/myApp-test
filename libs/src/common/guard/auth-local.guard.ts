import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthLocalGuard extends AuthGuard('auth-local') {
  handleRequest<TUser = any>(err: any, user: any): TUser {
    if (err) throw err;
    return user;
  }
}
