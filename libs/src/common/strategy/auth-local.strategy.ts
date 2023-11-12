import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../../../../apps/user-service/src/modules/auth/auth.service';
import { FAILED_AUTH } from '../constants';

@Injectable()
export class AuthLocalStrategy extends PassportStrategy(
  Strategy,
  'auth-local',
) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const user = await this.authService.validateByEmail(email);

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException(FAILED_AUTH);

    return user;
  }
}
