import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

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
    return true;
  }
}
