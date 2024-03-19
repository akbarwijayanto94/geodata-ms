import { BaseModel } from 'src/common/base.model.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { UsersAccessToken } from './users-access-token.entity'

@Entity()
export class Users extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'first_name' })
  firstName: string

  @Column({ name: 'last_name' })
  lastName: string

  @Column({ name: 'email', unique: true })
  email: string

  @Column({ name: 'password', nullable: false })
  password: string

  @Column({ type: 'text', nullable: true })
  address: string

  @OneToMany(() => UsersAccessToken, (usersAccesToken) => usersAccesToken.user)
  usersAccessTokens: UsersAccessToken[]
}
