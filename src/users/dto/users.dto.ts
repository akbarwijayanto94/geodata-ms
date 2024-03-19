import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class UsersDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  firstName: string

  @IsNotEmpty()
  lastName: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsNotEmpty()
  address: string
}
