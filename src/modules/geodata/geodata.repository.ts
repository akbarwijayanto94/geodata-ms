import { DataSource, Repository } from 'typeorm'

import { Injectable } from '@nestjs/common'
import { Geodata } from './entities/geodata.entity'

@Injectable()
export default class GeodataRepository extends Repository<Geodata> {
  constructor(dataSource: DataSource) {
    super(Geodata, dataSource.createEntityManager())
  }
}
