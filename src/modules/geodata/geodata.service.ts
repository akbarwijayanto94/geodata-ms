import { Injectable } from '@nestjs/common'
import { Users } from '../users/entities/users.entity'
import { CreateGeoDataDto } from './dto/create-geodata.dto'

@Injectable()
export class GeodataService {
  async create(dto: CreateGeoDataDto, user: Users, geoFiles?: Express.Multer.File[]) {
    // TODO store data to DB
    return geoFiles
  }
}
