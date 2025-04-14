export class PageRequestArgs {
  pageNumber?: number;
  pageSize?: number;
  sortBy?: Record<string, 'desc' | 'asc'>;
  skip?: number;
  search?: string;
}

export interface PageResponse<T> {
  readonly search?: string;
  readonly pageNumber?: number;
  readonly pageSize: number;
  readonly pageCount: number;
  readonly sortBy?: Record<string, 'desc' | 'asc'>;
  readonly content: T[];
}
