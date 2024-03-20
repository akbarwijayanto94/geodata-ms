import { HttpException, HttpStatus } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { ErrorsEnum } from 'src/common/errors.enum'
import { PageOptionsDto } from 'src/common/pagination/page.options'
import { UsersDto } from './dto/users.dto'
import { UsersFilter } from './dto/users.filter'
import UsersRepository from './users.repository'
import { UsersService } from './users.service'

describe('UsersService', () => {
  let service: UsersService

  let mockRepository = {
    getAll: jest.fn(),
    findOneBy: jest.fn(),
    save: jest.fn(),
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

    it('should paginate correctly when given parameter', async () => {
      const pageFilter = new UsersFilter()
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
      let filter = new UsersFilter()
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

  describe('create()', () => {
    it('should throw when email address already exist', async () => {
      const mockDto = new UsersDto()
      mockDto.email = 'wandy@email.com'

      mockRepository.findOneBy.mockResolvedValue({})

      const err = expect(service.create(mockDto)).rejects

      await err.toMatchObject({
        response: ErrorsEnum.EMAIL_ADDRESS_EXIST,
        status: HttpStatus.CONFLICT,
      })
      await err.toBeInstanceOf(HttpException)
    })

    it('should save data correcly', async () => {
      const mockDto = new UsersDto()
      mockDto.email = 'handy@email.com'
      mockDto.firstName = 'Handy'
      mockDto.lastName = 'Wardoyo'
      mockDto.password = '12345678'
      mockDto.roleId = 1

      mockRepository.findOneBy.mockResolvedValue(null)

      await service.create(mockDto)

      expect(mockRepository.findOneBy).toHaveBeenCalledTimes(1)
      expect(mockRepository.save).toHaveBeenCalledTimes(1)
      expect(mockRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'handy@email.com',
          firstName: 'Handy',
          role: { id: 1 },
        })
      )
    })
  })
})
