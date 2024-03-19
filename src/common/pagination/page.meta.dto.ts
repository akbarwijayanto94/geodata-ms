import { PageMetaDtoParameters } from "./meta.parameter.dto";

export class PageMetaDto {
  readonly page: number;
  readonly pageSize: number;
  readonly itemCount: number;
  readonly pageCount: number;
  readonly hasPreviousPage: boolean;
  readonly hasNextPage: boolean;

  constructor({ page, pageSize, itemCount }: PageMetaDtoParameters) {
    this.page = page;
    this.pageSize = pageSize;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.pageSize);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}
