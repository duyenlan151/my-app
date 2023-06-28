import { DataResponse, ParamsRequest } from './common';

export interface Products {
  id: string;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
}

export interface ParamsProductRequest extends ParamsRequest {
  select: string;
  pageParam?: number;
}

export interface DataResponeProducts extends DataResponse<Products> {
  products: Products[];
}
