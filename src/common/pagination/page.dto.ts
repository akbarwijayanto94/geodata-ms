import { IsArray } from 'class-validator'
import { PageMetaDto } from './page.meta.dto'

export class PageDto<T> {
  @IsArray()
  readonly data: T[]

  readonly metadata?: PageMetaDto

  constructor(data: T[], metadata?: PageMetaDto) {
    this.data = data
    this.metadata = metadata
  }
}
