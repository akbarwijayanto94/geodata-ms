import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Email address',
  })
  email: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Password',
  })
  password: string
}
