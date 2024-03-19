import { BaseModel } from 'src/common/base.model.entity'
import { Users } from 'src/users/entities/users.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Roles extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar')
  name: string

  @OneToMany(() => Users, (user) => user.role)
  users: Users[]
}
