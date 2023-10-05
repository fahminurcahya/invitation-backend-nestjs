import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthGuard as AuthGuardPassport } from '@nestjs/passport';


@Injectable()
export class AuthGuard extends AuthGuardPassport('jwt') {

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest(err, data, info) {
    if (err || !data) {
      throw err || new UnauthorizedException();
    }
    return data;
  }
}
