import {
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    try {
      const req = context.switchToHttp().getRequest();
      const token = req.cookies['token'];
      if (!token) {
        return false;
      }
      const secret = process.env.SECRET || 'secret';
      jwt.verify(token, secret);
      return true;
    } catch (e) {
      return false;
    }
  }
}
