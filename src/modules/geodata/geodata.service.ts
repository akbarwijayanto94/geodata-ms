import { Injectable } from '@nestjs/common'
import * as GV from 'geo-valley'
import { PageDto } from 'src/common/pagination/page.dto'
import { PageMetaDto } from 'src/common/pagination/page.meta.dto'
import { renderFullName } from 'src/common/utils/string.util'
import { GeoJsonTypeMemberEnum } from 'src/db/enum'
import { Users } from '../users/entities/users.entity'
import { CreateGeoDataDto } from './dto/create-geodata.dto'
import { GeodataFilter } from './dto/geodata.filter'
import { Geodata } from './entities/geodata.entity'
import GeodataRepository from './geodata.repository'

@Injectable()
export class GeodataService {
  constructor(private readonly repository: GeodataRepository) {}

  async create(dto: CreateGeoDataDto, user: Users, file?: Express.Multer.File) {
    const data = file.buffer.toString('utf8')
    const jsonData = JSON.parse(data)

    const validationResponse = await this.validateGeoData(dto.type, jsonData)

    if (!validationResponse) {
      const result = await this.repository.save({
        title: dto.title,
        description: dto.description,
        type: dto.type,
        data: jsonData,
        createdBy: renderFullName(user),
        user: {
          id: user.id,
        },
      })

      return result
    }

    return validationResponse
  }

  async validateGeoData(type: GeoJsonTypeMemberEnum, jsonData: any) {
    switch (type) {
      case GeoJsonTypeMemberEnum.POINT:
        return await GV.isPoint(jsonData)
      case GeoJsonTypeMemberEnum.MULTI_POINT:
        return await GV.isMultiPoint(jsonData)
      case GeoJsonTypeMemberEnum.LINE_STRING:
        return await GV.isLineString(jsonData)
      case GeoJsonTypeMemberEnum.MULTI_LINE_STRING:
        return await GV.isMultiLineString(jsonData)
      case GeoJsonTypeMemberEnum.POLYGON:
        return await GV.isPolygon(jsonData)
      case GeoJsonTypeMemberEnum.MULTI_POLYGON:
        return await GV.isMultiPolygon(jsonData)
      case GeoJsonTypeMemberEnum.FEATURE:
        return await GV.isFeature(jsonData)
      case GeoJsonTypeMemberEnum.FEATURE_COLLECTION:
        return await GV.isFeatureCollection(jsonData)
      case GeoJsonTypeMemberEnum.GEOMETRY_COLLECTION:
        return await GV.isGeometryCollection(jsonData)
      default:
        return
    }
  }

  async findAll(filter: GeodataFilter): Promise<PageDto<Geodata>> {
    const [entities, count] = await this.repository.getAll(filter)
    const pageMeta = new PageMetaDto({
      page: filter.page,
      pageSize: filter.pageSize,
      itemCount: count,
    })
    return new PageDto(entities, pageMeta)
  }
}
