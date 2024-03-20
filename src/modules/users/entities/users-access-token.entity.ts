import { BaseModel } from 'src/common/base.model.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Users } from './users.entity'

@Entity()
export class UsersAccessToken extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Users, (user) => user.usersAccessTokens)
  user: Users

  @Column('varchar')
  token: string

  @Column('int')
  expired: number

  @Column('boolean')
  isExpired: boolean
}
