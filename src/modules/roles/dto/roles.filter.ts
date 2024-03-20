import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'
import { PageOptionsDto } from 'src/common/pagination/page.options'
import { RoleEnum } from 'src/db/enum'

export class RolesFilter extends PageOptionsDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    enum: RoleEnum,
    description: 'Optional property to filter data by key of Role',
  })
  name?: string
}
