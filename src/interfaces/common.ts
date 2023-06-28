export interface DataResponse<T> {
  products: T[];
  limit: number;
  skip: number;
  total: number;
}

export interface ParamsRequest {
  search: string;
  skip: number;
  limit: number;
}
