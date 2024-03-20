import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
import { MAX_FILE_SIZE } from 'src/common'
import { AuthenticatedRequest } from 'src/common/interfaces/auth.interface'
import { RolesGuard } from 'src/guards/roles.guard'
import { CreateGeoDataDto } from './dto/create-geodata.dto'
import { GeodataService } from './geodata.service'

@Controller('geodata')
@ApiTags('Geo Data')
@ApiBearerAuth()
@UseGuards(RolesGuard)
export class GeodataController {
  constructor(private readonly geodataService: GeodataService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Upload GeoJson files successfully',
    type: String,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
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
        },
        geoFiles: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'geoFiles' }], {
      dest: 'tmp',
      limits: { fileSize: MAX_FILE_SIZE },
    })
  )
  async create(
    @Body() dto: CreateGeoDataDto,
    @Req() req: AuthenticatedRequest,
    @UploadedFiles()
    files: {
      geoFiles?: Express.Multer.File[]
    }
  ) {
    return await this.geodataService.create(dto, req.user, files.geoFiles)
  }
}
