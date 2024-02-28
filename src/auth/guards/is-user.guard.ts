import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './../auth.service';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class IsUserGuard implements CanActivate {
  constructor(private readonly authService: AuthService, private reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.replace('Bearer ', '');
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    if (token) {
      try {
        const decoded = this.authService.verifyToken(token);
        request.user = decoded;
        return true;
      } catch (error) {
        // Handle invalid token
        throw new UnauthorizedException();
      }
    }

    // No token provided
    new UnauthorizedException();
  }
}