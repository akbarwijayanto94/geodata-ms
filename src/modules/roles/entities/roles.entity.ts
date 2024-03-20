import { ApiResponseProperty } from '@nestjs/swagger'
import { BaseModel } from 'src/common/base.model.entity'
import { RoleEnum } from 'src/db/enum'
import { Users } from 'src/modules/users/entities/users.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Roles extends BaseModel {
  @PrimaryGeneratedColumn()
  @ApiResponseProperty({
    type: Number,
  })
  id: number

  @Column({ type: 'enum', enum: RoleEnum, nullable: true })
  @ApiResponseProperty({
    type: String,
    enum: RoleEnum,
  })
  name: RoleEnum

  @OneToMany(() => Users, (user) => user.role)
  users: Users[]
}
