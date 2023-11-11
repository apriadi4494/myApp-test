import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWT_SECRET } from 'libs/src/config';
import { Observable } from 'rxjs';

@Injectable()
export class ListenerGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request: any): Promise<boolean> {
    const isValidToken = this.jwtService.verify(request.token, {
      secret: JWT_SECRET,
    });

    if (!isValidToken) return false;
    return true;
  }
}
