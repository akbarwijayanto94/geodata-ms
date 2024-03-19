import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ErrorsEnum } from 'src/common/errors.enum'
import { RoleEnum } from 'src/db/enum'
import { ROLES_KEY } from './roles.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!requiredRoles) return true

    const { user } = context.switchToHttp().getRequest()
    const hasRoles = requiredRoles.some((role) => user.role.name === role)

    if (!hasRoles) throw new HttpException(ErrorsEnum.ROLES_UNAUTHORIZED, HttpStatus.FORBIDDEN)
    return true
  }
}
