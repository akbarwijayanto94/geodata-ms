import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
import { PageDto } from 'src/common/pagination/page.dto'
import { RoleEnum } from 'src/db/enum'
import { Roles } from 'src/guards/roles.decorator'
import { RolesGuard } from 'src/guards/roles.guard'
import { LoginResponseDto } from './dto/login-response.dto'
import { LoginDto } from './dto/login.dto'
import { UsersDto } from './dto/users.dto'
import { UsersFilter } from './dto/users.filter'
import { Users } from './entities/users.entity'
import { UsersService } from './users.service'

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(RolesGuard)
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  @ApiCreatedResponse({
    description: 'Fetch data successfully',
    type: Users,
    isArray: true,
  })
  @Roles(RoleEnum.ADMIN)
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
