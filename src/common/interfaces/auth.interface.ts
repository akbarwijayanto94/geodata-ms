import { Request } from 'express'
import { Users } from 'src/users/entities/users.entity'

export interface DataStoredInToken {
  email: string
}

export interface TokenData {
  token: string
  expiresIn: number
}

export interface AuthenticatedRequest extends Request {
  user: Users
  token: string
}
