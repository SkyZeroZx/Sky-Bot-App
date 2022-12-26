export interface Pagination<T> {
  data: T;
  meta: PaginationMetaParams;
}

export interface PaginationMetaParams {
  page?: number;
  take?: number;
  itemCount?: number;
  pageCount?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
  search?: string;
}

export interface QueryParamsPagination {
  page?: number;
  take?: number;
  search?: string;
  optionalSearch?: string;
}
