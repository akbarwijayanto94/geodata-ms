import { DataSource, Repository } from 'typeorm'

import { Injectable } from '@nestjs/common'
import { RolesFilter } from './dto/roles.filter'
import { Roles } from './entities/roles.entity'

@Injectable()
export default class RolesRepository extends Repository<Roles> {
  constructor(dataSource: DataSource) {
    super(Roles, dataSource.createEntityManager())
  }

  async getAll(filter: RolesFilter) {
    const queryBuilder = Roles.createQueryBuilder('role')

    if (filter.name) {
      queryBuilder.andWhere('role.name = :name', {
        name: filter.name,
      })
    }

    queryBuilder.orderBy('role.createdAt', filter.order).skip(filter.skip).take(filter.pageSize)

    return queryBuilder.getManyAndCount()
  }
}
