import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from '../users/users.service'
import { AuthController } from './auth.controller'

describe('AuthController', () => {
  let controller: AuthController
  let usersService: UsersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: UsersService, useValue: usersService }],
    }).compile()

    controller = module.get<AuthController>(AuthController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
