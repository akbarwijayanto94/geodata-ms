import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import { GeoJsonTypeMemberEnum } from 'src/db/enum'

export class CreateGeoDataDto {
  @IsString()
  @ApiProperty({
    type: String,
    enum: GeoJsonTypeMemberEnum,
    description: 'Geo Type Member',
  })
  type: string
}
