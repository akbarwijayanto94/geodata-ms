import { Injectable } from '@nestjs/common'
import { PageDto } from 'src/common/pagination/page.dto'
import { PageMetaDto } from 'src/common/pagination/page.meta.dto'
import { RolesFilter } from './dto/roles.filter'
import { Roles } from './entities/roles.entity'
import RolesRepository from './roles.repository'

@Injectable()
export class RolesService {
  constructor(private readonly repository: RolesRepository) {}

  async findAll(filter: RolesFilter): Promise<PageDto<Roles>> {
    const [entities, count] = await this.repository.getAll(filter)
    const pageMeta = new PageMetaDto({
      page: filter.page,
      pageSize: filter.pageSize,
      itemCount: count,
    })
    return new PageDto(entities, pageMeta)
  }
}
