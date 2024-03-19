import { BaseModel } from 'src/common/base.model.entity'
import { RoleEnum } from 'src/db/enum'
import { Users } from 'src/users/entities/users.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Roles extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'enum', enum: RoleEnum, nullable: true })
  name: RoleEnum

  @OneToMany(() => Users, (user) => user.role)
  users: Users[]
}
