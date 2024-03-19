import { IsOptional, IsString } from 'class-validator'
import { PageOptionsDto } from 'src/common/pagination/page.options'

export class UsersFilter extends PageOptionsDto {
  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  email?: string

  @IsString()
  @IsOptional()
  roles?: string
}
