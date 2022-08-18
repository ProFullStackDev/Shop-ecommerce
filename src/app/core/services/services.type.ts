export interface PageQuery {
  rows: number;
  page: number;
}

export interface PageResult<T> {
  rows: T[];
  total: number;
}
