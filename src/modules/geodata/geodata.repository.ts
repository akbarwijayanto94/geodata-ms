import { DataSource, Repository } from 'typeorm'

import { Injectable } from '@nestjs/common'
import { GeodataFilter } from './dto/geodata.filter'
import { Geodata } from './entities/geodata.entity'

@Injectable()
export default class GeodataRepository extends Repository<Geodata> {
  constructor(dataSource: DataSource) {
    super(Geodata, dataSource.createEntityManager())
  }

  async getAll(filter: GeodataFilter) {
    const queryBuilder = Geodata.createQueryBuilder('geodata').innerJoin('geodata.user', 'user')

    if (filter.userId) {
      queryBuilder.andWhere('user.id = :userId', {
        userId: filter.userId,
      })
    }

    queryBuilder.orderBy('geodata.createdAt', filter.order).skip(filter.skip).take(filter.pageSize)

    return queryBuilder.getManyAndCount()
  }
}
