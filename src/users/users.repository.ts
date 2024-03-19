import { Brackets, DataSource, Repository } from 'typeorm'

import { Injectable } from '@nestjs/common'
import { UsersFilter } from './dto/users.filter'
import { Users } from './entities/users.entity'

@Injectable()
export default class UsersRepository extends Repository<Users> {
  constructor(dataSource: DataSource) {
    super(Users, dataSource.createEntityManager())
  }

  async getAll(filter: UsersFilter) {
    const queryBuilder = Users.createQueryBuilder('user').innerJoin('user.role', 'role')

    if (filter.email) {
      queryBuilder.andWhere('user.email ILIKE :email', {
        email: `%${filter.email}%`,
      })
    }

    if (filter.name) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where('user.firstName ILIKE :name', {
            name: `%${filter.name}%`,
          }).orWhere('user.lastName ILIKE :name', {
            name: `%${filter.name}%`,
          })
        })
      )
    }

    if (filter.roles) {
      queryBuilder.andWhere('role.name = :roleName', { roleName: filter.roles })
    }

    queryBuilder.orderBy('user.createdAt', filter.order).skip(filter.skip).take(filter.pageSize)

    return queryBuilder.getManyAndCount()
  }
}
