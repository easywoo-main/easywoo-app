import { ApiProperty } from '@nestjs/swagger';

export class PageRequestArgs {
  @ApiProperty({ description: 'The page number to retrieve', example: 1, required: false })
  pageNumber?: number = 1;

  @ApiProperty({ description: 'The number of items per page', example: 200, required: false })
  pageSize?: number = 200;

  @ApiProperty({
    description: 'Sorting criteria in the format { field: "asc" | "desc" }',
    example: { id: 'desc' },
    required: false,
  })
  sortBy?: Record<string, 'desc' | 'asc'> = { id: 'desc' };

  @ApiProperty({ description: 'Number of items to skip', example: 0, required: false })
  skip?: number = this.pageNumber * this.pageSize - this.pageSize;

  @ApiProperty({ description: 'Search query string', example: '', required: false })
  search?: string = "";
}

export class PageRequest {
  readonly pageNumber?: number;
  readonly pageSize: number;
  readonly sortBy?: Record<string, 'desc' | 'asc'>;
  readonly skip: number;
  readonly search: string;

  constructor(
    pageRequestArgs: PageRequestArgs,
  ) {
    this.pageNumber = pageRequestArgs.pageNumber;
    this.pageSize = pageRequestArgs.pageSize;
    this.sortBy = pageRequestArgs.sortBy;
    this.skip = pageRequestArgs.skip;
    this.search = pageRequestArgs.search;
  }
  toPageResponse<T>(content: T[], count: number): PageResponse<T> {
    return new PageResponse<T>(this, content, count);
  }
}
export class PageResponse<T> {
  readonly search?: string;
  readonly pageNumber?: number;
  readonly pageSize?: number;
  readonly pageCount?: number;
  readonly sortBy?: Record<string, 'desc' | 'asc'>;
  readonly content: T[];

  constructor(pageRequest: PageRequest, content: T[], count: number) {
    this.search = pageRequest.search;
    this.pageNumber = pageRequest.pageNumber;
    this.pageSize = content.length < pageRequest.pageSize ? content.length : pageRequest.pageSize;
    this.pageCount = Math.ceil(count / (this.pageSize === 0 ? pageRequest.pageSize : this.pageSize));
    this.sortBy = pageRequest.sortBy;
    this.content = content;
  }
}
