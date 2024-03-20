import { ApiResponseProperty } from '@nestjs/swagger'
import { BaseModel } from 'src/common/base.model.entity'
import { GeoJsonTypeMemberEnum } from 'src/db/enum'
import { Users } from 'src/modules/users/entities/users.entity'
import { Any, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Geodata extends BaseModel {
  @PrimaryGeneratedColumn()
  @ApiResponseProperty({
    type: Number,
  })
  id: number

  @Column('varchar')
  @ApiResponseProperty({
    type: String,
  })
  title: string

  @Column('varchar')
  @ApiResponseProperty({
    type: String,
  })
  description: string

  @Column({ type: 'enum', enum: GeoJsonTypeMemberEnum, nullable: false })
  @ApiResponseProperty({
    type: String,
    enum: GeoJsonTypeMemberEnum,
  })
  type: GeoJsonTypeMemberEnum

  @Column('jsonb', { nullable: false })
  @ApiResponseProperty({
    type: Any,
  })
  data: any

  @ManyToOne(() => Users, (user) => user.usersAccessTokens)
  user: Users
}
