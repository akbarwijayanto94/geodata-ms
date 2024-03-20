import { HttpException, HttpStatus, Injectable, Logger, NestMiddleware } from '@nestjs/common'
import { Request } from 'express'
import { verify } from 'jsonwebtoken'
import { SECRET_KEY } from 'src/common/config'
import { ErrorsEnum } from 'src/common/errors.enum'
import { DataStoredInToken } from 'src/common/interfaces/auth.interface'
import { getAuthorization } from 'src/common/utils/jwt.util'
import { Users } from 'src/modules/users/entities/users.entity'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthMiddleware.name)

  async use(req: Request, res: Response, next: (error?: any) => void) {
    try {
      const bearerToken = getAuthorization(req.headers)

      if (bearerToken) {
        const { email } = verify(bearerToken, SECRET_KEY!) as DataStoredInToken

        const findUser = await Users.findOne({
          where: {
            email: email,
          },
          relations: { role: true },
        })

        if (findUser) {
          req['token'] = bearerToken
          req['user'] = findUser
          next()
        } else {
          this.logger.error('user not found')
          next(new HttpException(ErrorsEnum.AUTH_WRONG_TOKEN, HttpStatus.UNAUTHORIZED))
        }
      } else {
        this.logger.error('missing token')
        next(new HttpException(ErrorsEnum.AUTH_WRONG_TOKEN, HttpStatus.UNAUTHORIZED))
      }
    } catch (error) {
      this.logger.error(error)
      next(new HttpException(ErrorsEnum.AUTH_WRONG_TOKEN, HttpStatus.UNAUTHORIZED))
    }
  }
}
