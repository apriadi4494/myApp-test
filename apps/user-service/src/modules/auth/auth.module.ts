import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { AuthLocalStrategy } from 'libs/src/common/strategy/auth-local.strategy';
import { JwtStrategy } from 'libs/src/common/strategy/auth-jwt.strategy';
import { UserModule } from '../user/user.module';
import { jwtConfigModule } from 'libs/src/config/jwt/jwt-config';

@Module({
  imports: [PassportModule, jwtConfigModule, UserModule],
  providers: [AuthService, AuthLocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
