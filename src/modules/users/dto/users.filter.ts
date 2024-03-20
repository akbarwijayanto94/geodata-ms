import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'
import { PageOptionsDto } from 'src/common/pagination/page.options'
import { RoleEnum } from 'src/db/enum'

export class UsersFilter extends PageOptionsDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    description: 'Optional property to filter data by name',
  })
  name?: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    description: 'Optional property to filter data by email address',
  })
  email?: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    enum: RoleEnum,
    description: 'Optional property to filter data by role key',
  })
  roles?: string
}
