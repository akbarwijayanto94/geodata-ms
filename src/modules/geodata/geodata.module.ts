import { Module } from '@nestjs/common'
import { GeodataController } from './geodata.controller'
import GeodataRepository from './geodata.repository'
import { GeodataService } from './geodata.service'

@Module({
  controllers: [GeodataController],
  providers: [GeodataService, GeodataRepository],
})
export class GeodataModule {}
