import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import { REFRESH_TOKEN_EXPIRED } from 'libs/src';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
    //
  }

  generateToken(id: string) {
    try {
      const token = this.jwtService.sign({ id });
      const refreshToken = this.jwtService.sign(
        { id },
        { expiresIn: REFRESH_TOKEN_EXPIRED },
      );

      return { token, refreshToken };
    } catch (err) {
      throw err;
    }
  }

  async login(req: any) {
    try {
      const token = this.generateToken(req.id);
      return token;
    } catch (err) {
      throw err;
    }
  }

  async findAuthorization(id: string): Promise<User> {
    try {
      const user = await this.userService.findById(id);
      return user;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async validateByEmail(email: string): Promise<User> {
    try {
      const user = await this.userService.findByEmail(email);
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
