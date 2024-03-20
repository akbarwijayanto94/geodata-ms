import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
import { MAX_FILE_SIZE } from 'src/common'
import { AuthenticatedRequest } from 'src/common/interfaces/auth.interface'
import { RolesGuard } from 'src/guards/roles.guard'
import { CreateGeoDataDto } from './dto/create-geodata.dto'
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
        },
        description: {
          type: 'string',
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
        },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', { dest: 'tmp', limits: { fileSize: MAX_FILE_SIZE } }))
  async create(
    @Body() dto: CreateGeoDataDto,
    @Req() req: AuthenticatedRequest,
    @UploadedFile() file: Express.Multer.File
  ) {
    return await this.geodataService.create(dto, req.user, file)
  }
}
