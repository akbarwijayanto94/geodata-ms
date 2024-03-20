import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'
import { GeoJsonTypeMemberEnum } from 'src/db/enum'

export class CreateGeoDataDto {
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Title of data',
  })
  title: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    description: 'Description of data',
  })
  description?: string

  @IsString()
  @ApiProperty({
    type: String,
    enum: GeoJsonTypeMemberEnum,
    description: 'Geo Type Member',
  })
  type: GeoJsonTypeMemberEnum
}
