import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { compare, hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { LIFETIME, SECRET_KEY } from 'src/common/config'
import { ErrorsEnum } from 'src/common/errors.enum'
import { DataStoredInToken, TokenData } from 'src/common/interfaces/auth.interface'
import { PageDto } from 'src/common/pagination/page.dto'
import { PageMetaDto } from 'src/common/pagination/page.meta.dto'
import { LoginDto } from './dto/login.dto'
import { UsersDto } from './dto/users.dto'
import { UsersFilter } from './dto/users.filter'
import { UsersAccessToken } from './entities/users-access-token.entity'
import { Users } from './entities/users.entity'
import UserRepository from './users.repository'

@Injectable()
export class UsersService {
  constructor(private readonly repository: UserRepository) {}

  async findAll(filter: UsersFilter): Promise<PageDto<Users>> {
    const [entities, count] = await this.repository.getAll(filter)
    const pageMeta = new PageMetaDto({
      page: filter.page,
      pageSize: filter.pageSize,
      itemCount: count,
    })
    return new PageDto(entities, pageMeta)
  }

  async create(usersDto: UsersDto): Promise<Users> {
    const findUser: Users = await this.repository.findOneBy({
      email: usersDto.email,
    })
    if (findUser)
      throw new HttpException(`This email ${usersDto.email} already exists`, HttpStatus.CONFLICT)

    const hashedPassword = await hash(usersDto.password, 10)
    const createUserData = { ...usersDto, password: hashedPassword }

    return this.repository.save(createUserData)
  }

  async login(loginDto: LoginDto): Promise<{ token: string; isAuthenticated: boolean }> {
    const findUser: Users = await this.repository.findOneBy({
      email: loginDto.email,
    })
    if (!findUser)
      throw new HttpException(ErrorsEnum.AUTH_INVALID_USER_PASS, HttpStatus.UNPROCESSABLE_ENTITY)

    const isPasswordMatching: boolean = await compare(loginDto.password, findUser.password)
    if (!isPasswordMatching)
      throw new HttpException(ErrorsEnum.AUTH_INVALID_USER_PASS, HttpStatus.UNPROCESSABLE_ENTITY)

    const tokenData = this.createToken(findUser)
    const createdToken: UsersAccessToken = await this.repository.manager.save(UsersAccessToken, {
      token: tokenData.token,
      expired: tokenData.expiresIn,
      isExpired: false,
      userId: findUser.id,
    })
    if (!createdToken)
      throw new HttpException(ErrorsEnum.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR)

    return { token: tokenData.token, isAuthenticated: true }
  }

  createToken(user: Users): TokenData {
    const dataStoredInToken: DataStoredInToken = { email: user.email }
    const expiresIn: number = Number(LIFETIME)

    return { expiresIn, token: sign(dataStoredInToken, SECRET_KEY!, { expiresIn }) }
  }
}
