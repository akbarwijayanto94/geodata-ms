import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'
import { PageOptionsDto } from 'src/common/pagination/page.options'

export class GeodataFilter extends PageOptionsDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    description: 'Optional property to filter data by user id',
  })
  userId?: string
}
