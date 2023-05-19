import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authToken = request.headers.authorization;

    if (!authToken) {
      return false;
    }
    const token = authToken.split(' ')[1];
    const payload = this.authService.verifyToken(token);
    if (!payload) {
      return false;
    }
    const user = await this.authService.getUserById(payload.id);
    request.user = user;
    const requiredRoles = this.reflector.getAllAndOverride('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    console.log(user.role);
    console.log(requiredRoles);

    return requiredRoles.includes(user.role);
  }
}

// @Injectable()
// export class RoleGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const requiredRoles = this.reflector.getAllAndOverride('roles', [
//       context.getHandler(),
//       context.getClass(),
//     ]);
//     if (!requiredRoles) {
//       return true;
//     }
//     const { user } = context.switchToHttp().getRequest();
//     console.log(user.role);
//     console.log(requiredRoles);

//     return requiredRoles.includes(user.role);
//   }
// }
