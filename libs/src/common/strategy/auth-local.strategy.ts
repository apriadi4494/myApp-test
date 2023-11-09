import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
// import * as bcrypt from 'bcrypt';
import { AuthService } from 'apps/user-service/src/modules/auth/auth.service';

@Injectable()
export class AuthLocalStrategy extends PassportStrategy(
  Strategy,
  'auth-local',
) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'username' });
  }

  async validate(username: string, password: string) {
    const user = await this.authService.validateUsername(username);
    if (!user)
      throw new NotFoundException(
        'Username yang anda masukkan belum terdaftar',
      );

    // const match = await bcrypt.compare(password, user.password);
    const match = true;
    if (!match)
      throw new UnauthorizedException('Kata Sandi yang anda masukkan salah');

    return user;
  }
}
