import { Test, TestingModule } from '@nestjs/testing'
import RolesRepository from './roles.repository'
import { RolesService } from './roles.service'

describe('RolesService', () => {
  let service: RolesService
  let mockRepository = {
    getAll: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolesService, { provide: RolesRepository, useValue: mockRepository }],
    }).compile()

    service = module.get<RolesService>(RolesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
