import { Test, TestingModule } from '@nestjs/testing'
import { PageOptionsDto } from 'src/common/pagination/page.options'
import { UsersFilter } from './dto/users.filter'
import UsersRepository from './users.repository'
import { UsersService } from './users.service'

describe('UsersService', () => {
  let service: UsersService

  let mockRepository = {
    getAll: jest.fn(),
  }

  beforeEach(async () => {
    jest.resetAllMocks()
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: mockRepository,
        },
      ],
    }).compile()

    service = module.get(UsersService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('findAll()', () => {
    it('should call repository getAll()', async () => {
      const filter = new UsersFilter()
      mockRepository.getAll.mockResolvedValueOnce([[{}], {}])

      await service.findAll(filter)

      expect(mockRepository.getAll).toHaveBeenCalledWith(filter)
      expect(mockRepository.getAll).toHaveBeenCalledTimes(1)
    })

    it('should paginate correctly when not given parameter', async () => {
      const mockData = [{}, {}]

      mockRepository.getAll.mockResolvedValue([mockData, 2])

      const pageFilter = new PageOptionsDto()
      const pageFilterMutable = pageFilter as any
      pageFilterMutable.page = 1
      pageFilterMutable.pageSize = 10

      const pageDto = await service.findAll(pageFilterMutable)

      expect(pageDto.metadata.itemCount).toEqual(2)
      expect(pageDto.metadata.page).toEqual(1)
      expect(pageDto.metadata.hasPreviousPage).toEqual(false)
      expect(pageDto.metadata.hasNextPage).toEqual(false)
      expect(pageDto.data.length).toEqual(2)
    })
  })
})
