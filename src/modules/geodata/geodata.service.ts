import { Injectable } from '@nestjs/common'
import * as fs from 'fs'
import * as GV from 'geo-valley'
import { join } from 'path'
import { renderFullName } from 'src/common/utils/string.util'
import { GeoJsonTypeMemberEnum } from 'src/db/enum'
import { Users } from '../users/entities/users.entity'
import { CreateGeoDataDto } from './dto/create-geodata.dto'
import GeodataRepository from './geodata.repository'

@Injectable()
export class GeodataService {
  constructor(private readonly repository: GeodataRepository) {}

  async create(dto: CreateGeoDataDto, user: Users, file?: Express.Multer.File) {
    const data = fs.readFileSync(join(process.cwd(), file.path)).toString()
    const jsonData = JSON.parse(data)

    const validationResponse = await this.validateGeoData(dto.type, jsonData)

    if (!validationResponse) {
      const result = await this.repository.save({
        title: dto.title,
        description: dto.description,
        type: dto.type,
        data: jsonData,
        createdBy: renderFullName(user),
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
      default:
        return
    }
  }
}
