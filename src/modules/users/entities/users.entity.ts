import { ApiResponseProperty } from '@nestjs/swagger'
import { BaseModel } from 'src/common/base.model.entity'
import { Roles } from 'src/modules/roles/entities/roles.entity'
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { UsersAccessToken } from './users-access-token.entity'

@Entity()
export class Users extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  @ApiResponseProperty({
    type: String,
  })
  id: string

  @Column({ name: 'first_name' })
  @ApiResponseProperty({
    type: String,
  })
  firstName: string

  @Column({ name: 'last_name' })
  @ApiResponseProperty({
    type: String,
  })
  lastName: string

  @Column({ name: 'email', unique: true })
  @ApiResponseProperty({
    type: String,
  })
  email: string

  @Column({ name: 'password', nullable: false })
  password: string

  @Column({ type: 'text', nullable: true })
  @ApiResponseProperty({
    type: String,
  })
  address: string

  @OneToMany(() => UsersAccessToken, (usersAccesToken) => usersAccesToken.user)
  usersAccessTokens: UsersAccessToken[]

  @ManyToOne(() => Roles, (role) => role.users)
  role: Roles
}
