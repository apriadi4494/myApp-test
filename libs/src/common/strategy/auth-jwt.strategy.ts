import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from 'apps/user-service/src/modules/auth/auth.service';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'auth-jwt') {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  //TODO change any to dto
  async validate(payload: any) {
    const { id } = await this.authService.findAuthorization(payload.sub);

    console.log(id, 'tesssssssssssss');
    return {
      id: payload.sub,
    };
  }
}
