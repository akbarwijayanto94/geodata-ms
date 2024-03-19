import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
import { PageDto } from 'src/common/pagination/page.dto'
import { LoginResponseDto } from './dto/login-response.dto'
import { LoginDto } from './dto/login.dto'
import { UsersDto } from './dto/users.dto'
import { UsersFilter } from './dto/users.filter'
import { Users } from './entities/users.entity'
import { UsersService } from './users.service'

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  @ApiCreatedResponse({
    description: 'Fetch data successfully',
    type: Users,
    isArray: true,
  })
  public findAll(@Query() filter: UsersFilter): Promise<PageDto<Users>> {
    return this.service.findAll(filter)
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Create data successfully',
    type: String,
    isArray: false,
  })
  public create(@Body() usersDto: UsersDto): Promise<string> {
    return this.service.create(usersDto)
  }

  @Post('/login')
  @ApiCreatedResponse({
    description: 'Login successfully',
    type: LoginResponseDto,
    isArray: false,
  })
  public login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.service.login(loginDto)
  }
}
