import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
import { MAX_FILE_SIZE } from 'src/common'
import { AuthenticatedRequest } from 'src/common/interfaces/auth.interface'
import { PageDto } from 'src/common/pagination/page.dto'
import { RoleEnum } from 'src/db/enum'
import { Roles } from 'src/guards/roles.decorator'
import { RolesGuard } from 'src/guards/roles.guard'
import { CreateGeoDataDto } from './dto/create-geodata.dto'
import { GeodataFilter } from './dto/geodata.filter'
import { Geodata } from './entities/geodata.entity'
import { GeodataService } from './geodata.service'

@Controller('geodata')
@ApiTags('Geo Data')
@ApiBearerAuth()
@UseGuards(RolesGuard)
export class GeodataController {
  constructor(private readonly geodataService: GeodataService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Upload GeoJson file successfully',
    type: Geodata,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          description: 'Title of data',
        },
        description: {
          type: 'string',
          description: 'Description of data',
        },
        type: {
          type: 'string',
          enum: [
            'Point',
            'MultiPoint',
            'LineString',
            'MultiLineString',
            'Polygon',
            'MultiPolygon',
            'GeometryCollection',
            'Feature',
            'FeatureCollection',
          ],
          description: 'Geo Type Member',
        },
        file: {
          type: 'string',
          format: 'binary',
          description: 'Geo json file that contain geo data',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', { dest: 'tmp', limits: { fileSize: MAX_FILE_SIZE } }))
  @Roles(RoleEnum.ADMIN)
  async create(
    @Body() dto: CreateGeoDataDto,
    @Req() req: AuthenticatedRequest,
    @UploadedFile() file: Express.Multer.File
  ) {
    return await this.geodataService.create(dto, req.user, file)
  }

  @Get()
  @ApiCreatedResponse({
    description: 'Fetch data successfully',
    type: Geodata,
    isArray: true,
  })
  @Roles(RoleEnum.ADMIN, RoleEnum.OPERATION)
  findAll(@Query() filter: GeodataFilter): Promise<PageDto<Geodata>> {
    return this.geodataService.findAll(filter)
  }
}
