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
    const queryBuilder = Users.createQueryBuilder()

    if (filter.email) {
      queryBuilder.andWhere('email ILIKE :email', {
        email: `%${filter.email}%`,
      })
    }

    if (filter.name) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where('first_name ILIKE :name', {
            name: `%${filter.name}%`,
          }).orWhere('last_name ILIKE :name', {
            name: `%${filter.name}%`,
          })
        })
      )
    }

    queryBuilder.orderBy('created_at', filter.order).skip(filter.skip).take(filter.pageSize)

    return queryBuilder.getManyAndCount()
  }
}
