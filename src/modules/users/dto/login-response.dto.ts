import { ApiResponseProperty } from '@nestjs/swagger'
import { IsBoolean, IsString } from 'class-validator'

export class LoginResponseDto {
  @IsString()
  @ApiResponseProperty({
    type: String,
  })
  token: string

  @IsBoolean()
  @ApiResponseProperty({
    type: Boolean,
  })
  isAuthenticated: boolean
}
