import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { PageDto } from 'src/common/pagination/page.dto'
import { LoginDto } from './dto/login.dto'
import { UsersDto } from './dto/users.dto'
import { UsersFilter } from './dto/users.filter'
import { Users } from './entities/users.entity'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  public findAll(@Query() filter: UsersFilter): Promise<PageDto<Users>> {
    return this.service.findAll(filter)
  }

  @Post()
  public create(@Body() usersDto: UsersDto): Promise<Users> {
    return this.service.create(usersDto)
  }

  @Post('/login')
  public login(@Body() loginDto: LoginDto): Promise<{ token: string; isAuthenticated: boolean }> {
    return this.service.login(loginDto)
  }
}
