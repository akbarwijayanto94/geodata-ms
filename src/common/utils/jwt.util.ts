import { HttpException, HttpStatus } from '@nestjs/common'
import { Request } from 'express'
import { IncomingHttpHeaders } from 'http'
import { verify } from 'jsonwebtoken'
import { Users } from 'src/modules/users/entities/users.entity'
import { SECRET_KEY } from '../config'
import { ErrorsEnum } from '../errors.enum'
import { DataStoredInToken } from '../interfaces/auth.interface'

/** Get bearer token from http header */
export const getAuthorization = (headers: IncomingHttpHeaders) => {
  if (headers.authorization) return headers.authorization.split('Bearer ')[1]

  return null
}

export const getUserData = async (req: Request) => {
  const token = getAuthorization(req.headers)
  const { email } = verify(token, SECRET_KEY!) as DataStoredInToken

  const user: Users = await Users.findOne({
    where: {
      email,
    },
  })
  if (!user) throw new HttpException(ErrorsEnum.AUTH_WRONG_TOKEN, HttpStatus.UNAUTHORIZED)

  return user
}
