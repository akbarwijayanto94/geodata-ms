import { Test, TestingModule } from '@nestjs/testing'
import { GeodataController } from './geodata.controller'
import { GeodataService } from './geodata.service'

describe('GeodataController', () => {
  let controller: GeodataController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeodataController],
      providers: [GeodataService],
    }).compile()

    controller = module.get<GeodataController>(GeodataController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
