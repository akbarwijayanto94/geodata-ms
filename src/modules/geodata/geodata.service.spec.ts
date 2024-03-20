import { Test, TestingModule } from '@nestjs/testing'
import GeodataRepository from './geodata.repository'
import { GeodataService } from './geodata.service'

describe('GeodataService', () => {
  let service: GeodataService
  let mockRepository = {
    getAll: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeodataService, { provide: GeodataRepository, useValue: mockRepository }],
    }).compile()

    service = module.get<GeodataService>(GeodataService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
