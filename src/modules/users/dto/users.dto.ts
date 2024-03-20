import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class UsersDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
  })
  email: string

  @IsNotEmpty()
  @ApiProperty({
    type: String,
  })
  firstName: string

  @IsNotEmpty()
  @ApiProperty({
    type: String,
  })
  lastName: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
  })
  password: string

  @IsString()
  @ApiPropertyOptional({
    type: String,
    description: 'Optional property',
  })
  address?: string

  @IsString()
  @ApiProperty({
    type: Number,
    description: 'ID of Role',
  })
  roleId: number
}
