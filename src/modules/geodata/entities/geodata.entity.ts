import { BaseModel } from 'src/common/base.model.entity'
import { GeoJsonTypeMemberEnum } from 'src/db/enum'
import { Users } from 'src/modules/users/entities/users.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Geodata extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'enum', enum: GeoJsonTypeMemberEnum, nullable: false })
  type: GeoJsonTypeMemberEnum

  @Column('jsonb', { nullable: false })
  data: any

  @ManyToOne(() => Users, (user) => user.usersAccessTokens)
  user: Users
}
