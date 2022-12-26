import { QueryParamsPagination } from '@core/interfaces';

export const ADMINISTRATIVE_ROLE: string[] = ['admin', 'employee'];

export const QUERY_PARAMS_PAGINATON: QueryParamsPagination = {
  page: 1,
  take: 5,
  search: null,
  optionalSearch: null,
};

export function IS_ADMINSITRATIVE_ROLE(role: string): boolean {
  return ADMINISTRATIVE_ROLE.indexOf(role) !== -1;
}

export const REPORT: any[] = [];

export const MAX_DATE = new Date();

export const INIT_DATE = new Date(
  MAX_DATE.getFullYear(),
  MAX_DATE.getMonth(),
  MAX_DATE.getDate() - 3,
);
