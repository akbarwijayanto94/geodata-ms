import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
import { PageDto } from 'src/common/pagination/page.dto'
import { RoleEnum } from 'src/db/enum'
import { Roles } from 'src/guards/roles.decorator'
import { RolesGuard } from 'src/guards/roles.guard'
import { RolesFilter } from './dto/roles.filter'
import { Roles as RoleEntity } from './entities/roles.entity'
import { RolesService } from './roles.service'

@Controller('roles')
@ApiTags('Roles')
@ApiBearerAuth()
@UseGuards(RolesGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @ApiCreatedResponse({
    description: 'Fetch data successfully',
    type: RoleEntity,
    isArray: true,
  })
  @Roles(RoleEnum.ADMIN, RoleEnum.OPERATION)
  findAll(@Query() filter: RolesFilter): Promise<PageDto<RoleEntity>> {
    return this.rolesService.findAll(filter)
  }
}
