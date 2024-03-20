import { Test, TestingModule } from '@nestjs/testing'
import { PageOptionsDto } from 'src/common/pagination/page.options'
import { RolesFilter } from './dto/roles.filter'
import RolesRepository from './roles.repository'
import { RolesService } from './roles.service'

describe('RolesService', () => {
  let service: RolesService
  let mockRepository = {
    getAll: jest.fn(),
  }

  beforeEach(async () => {
    jest.resetAllMocks()
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolesService, { provide: RolesRepository, useValue: mockRepository }],
    }).compile()

    service = module.get<RolesService>(RolesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('findAll()', () => {
    it('should call repository getAll()', async () => {
      const filter = new RolesFilter()
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

    it('should paginate correctly when given parameter', async () => {
      const pageFilter = new RolesFilter()
      const pageFilterMutable = pageFilter as any
      pageFilterMutable.page = 1
      pageFilterMutable.pageSize = 2

      mockRepository.getAll.mockResolvedValueOnce([[{}, {}, {}, {}], 4])

      const pageDto = await service.findAll(pageFilter)

      expect(mockRepository.getAll).toHaveBeenCalledWith(
        expect.objectContaining({
          page: 1,
          pageSize: 2,
        })
      )
      expect(mockRepository.getAll).toHaveBeenCalledTimes(1)
      expect(pageDto.metadata.itemCount).toEqual(4)
      expect(pageDto.metadata.page).toEqual(1)
      expect(pageDto.metadata.pageSize).toEqual(2)
      expect(pageDto.metadata.hasPreviousPage).toEqual(false)
      expect(pageDto.metadata.hasNextPage).toEqual(true)
      expect(pageDto.data.length).toEqual(4)
    })

    it('should return empty data when filter is not match', async () => {
      let filter = new RolesFilter()
      filter.name = 'wrong-name'

      mockRepository.getAll.mockResolvedValueOnce([[], 0])

      const pageDto = await service.findAll(filter)

      expect(mockRepository.getAll).toHaveBeenCalledWith(
        expect.objectContaining({
          page: 1,
          pageSize: 10,
          name: 'wrong-name',
        })
      )
      expect(mockRepository.getAll).toHaveBeenCalledTimes(1)
      expect(pageDto.metadata.itemCount).toEqual(0)
      expect(pageDto.metadata.page).toEqual(1)
      expect(pageDto.metadata.pageSize).toEqual(10)
      expect(pageDto.metadata.hasPreviousPage).toEqual(false)
      expect(pageDto.metadata.hasNextPage).toEqual(false)
      expect(pageDto.data.length).toEqual(0)
    })
  })
})
