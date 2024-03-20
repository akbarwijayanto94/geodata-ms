import { Test, TestingModule } from '@nestjs/testing'
import { buildMockFile } from 'src/common/utils/test.util'
import { GeoJsonTypeMemberEnum } from 'src/db/enum'
import { Users } from '../users/entities/users.entity'
import { CreateGeoDataDto } from './dto/create-geodata.dto'
import { GeodataFilter } from './dto/geodata.filter'
import GeodataRepository from './geodata.repository'
import { GeodataService } from './geodata.service'

describe('GeodataService', () => {
  let service: GeodataService
  let mockRepository = {
    getAll: jest.fn(),
    save: jest.fn(),
  }

  beforeEach(async () => {
    jest.resetAllMocks()
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeodataService, { provide: GeodataRepository, useValue: mockRepository }],
    }).compile()

    service = module.get<GeodataService>(GeodataService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('findAll()', () => {
    it('should call repository getAll()', async () => {
      const filter = new GeodataFilter()
      mockRepository.getAll.mockResolvedValueOnce([[{}], {}])

      await service.findAll(filter)

      expect(mockRepository.getAll).toHaveBeenCalledWith(filter)
      expect(mockRepository.getAll).toHaveBeenCalledTimes(1)
    })

    it('should paginate correctly when not given parameter', async () => {
      const mockData = [{}, {}]

      mockRepository.getAll.mockResolvedValue([mockData, 2])

      const pageDto = await service.findAll(new GeodataFilter())

      expect(mockRepository.getAll).toHaveBeenCalledWith(
        expect.objectContaining({
          page: 1,
          pageSize: 10,
        })
      )
      expect(mockRepository.getAll).toHaveBeenCalledTimes(1)
      expect(pageDto.metadata.itemCount).toEqual(2)
      expect(pageDto.metadata.page).toEqual(1)
      expect(pageDto.metadata.pageSize).toEqual(10)
      expect(pageDto.metadata.hasPreviousPage).toEqual(false)
      expect(pageDto.metadata.hasNextPage).toEqual(false)
      expect(pageDto.data.length).toEqual(2)
    })

    it('should paginate correctly when given parameter', async () => {
      const pageFilter = new GeodataFilter()
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
      let filter = new GeodataFilter()
      filter.userId = 'wrong-id'

      mockRepository.getAll.mockResolvedValueOnce([[], 0])

      const pageDto = await service.findAll(filter)

      expect(mockRepository.getAll).toHaveBeenCalledWith(
        expect.objectContaining({
          page: 1,
          pageSize: 10,
          userId: 'wrong-id',
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

  describe('create()', () => {
    it('should save data correctly', async () => {
      const mockDto = new CreateGeoDataDto()
      mockDto.type = GeoJsonTypeMemberEnum.POINT
      mockDto.title = 'Indomaret Point'

      const mockUser = new Users()
      mockUser.id = 'user-id'

      const mockFile = buildMockFile('file', 'point.geojson', 400000)

      const mockReadFile = {
        type: 'Point',
        coordinates: [100.0, 0.0],
      }

      jest.spyOn(JSON, 'parse').mockReturnValue(mockReadFile)

      await service.create(mockDto, mockUser, mockFile)

      expect(mockRepository.save).toHaveBeenCalled()
      expect(mockRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'Point',
          data: { type: 'Point', coordinates: [100.0, 0.0] },
          user: {
            id: 'user-id',
          },
        })
      )
    })

    it('should validate data correctly', async () => {
      const mockDto = new CreateGeoDataDto()
      mockDto.type = GeoJsonTypeMemberEnum.POINT
      mockDto.title = 'Indomaret Point'

      const mockUser = new Users()
      mockUser.id = 'user-id'

      const mockFile = buildMockFile('file', 'point.geojson', 400000)

      const mockReadFile = {
        type: 'Point',
      }

      jest.spyOn(JSON, 'parse').mockReturnValue(mockReadFile)

      const result = await service.create(mockDto, mockUser, mockFile)

      expect(mockRepository.save).toHaveBeenCalledTimes(0)
      expect(Array.isArray(result)).toBe(true)
      expect(result[0]).toMatch('coordinates') // expect that attribute 'coordinates' is not defined
    })
  })
})
