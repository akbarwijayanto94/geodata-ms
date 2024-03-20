import { Test, TestingModule } from '@nestjs/testing'
import { RolesController } from './roles.controller'
import { RolesService } from './roles.service'

describe('RolesController', () => {
  let controller: RolesController
  let rolesService: RolesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [{ provide: RolesService, useValue: rolesService }],
    }).compile()

    controller = module.get<RolesController>(RolesController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
