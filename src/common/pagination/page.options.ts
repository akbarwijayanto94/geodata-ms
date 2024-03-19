import { ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator'
import { Order } from '..'

export class PageOptionsDto {
  @IsEnum(Order)
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    enum: Order,
    default: Order.DESC,
    description: 'Optional property to ordering the data',
  })
  readonly order?: Order = Order.DESC

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  @ApiPropertyOptional({
    type: Number,
    default: 1,
    description: 'Optional property to take the page number of data',
  })
  readonly page?: number = 1

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  @ApiPropertyOptional({
    type: Number,
    default: 10,
    description: 'Optional property to take the data size on the page',
  })
  readonly pageSize?: number = 10

  get skip(): number {
    return (this.page - 1) * this.pageSize
  }
}
