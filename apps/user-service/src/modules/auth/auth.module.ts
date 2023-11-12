import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { jwtConfigModule } from '@app/main/config/jwt/jwt-config';
import { AuthLocalStrategy, JwtStrategy } from '@app/main';

@Module({
  imports: [PassportModule, jwtConfigModule, UserModule],
  providers: [AuthService, AuthLocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
