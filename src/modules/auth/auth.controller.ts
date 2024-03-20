import { Body, Controller, Post } from '@nestjs/common'
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
import { LoginResponseDto } from '../users/dto/login-response.dto'
import { LoginDto } from '../users/dto/login.dto'
import { UsersDto } from '../users/dto/users.dto'
import { UsersService } from '../users/users.service'

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly service: UsersService) {}

  @Post('/register')
  @ApiCreatedResponse({
    description: 'Register data successfully',
    type: String,
    isArray: false,
  })
  public register(@Body() usersDto: UsersDto): Promise<string> {
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
