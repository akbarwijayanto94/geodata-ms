import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class UsersDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Email address',
  })
  email: string

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Email address',
  })
  firstName: string

  @IsNotEmpty()
  @ApiPropertyOptional({
    type: String,
    description: 'Optional property',
  })
  lastName?: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Password',
  })
  password: string

  @IsString()
  @ApiPropertyOptional({
    type: String,
    description: 'Optional property',
  })
  address?: string

  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'ID of Role',
  })
  roleId: number
}
