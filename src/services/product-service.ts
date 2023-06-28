import { DEFAULT_LIMIT, DEFAULT_SKIP } from '@/constants';
import { ParamsProductRequest, Products } from '@/interfaces';
import { formatQueryString, request } from '@/utils';

interface UrlParamsProps {
  [key: string]: string;
}
const urlParams = (params?: Partial<ParamsProductRequest>) => {
  let defaultParams: UrlParamsProps = {
    skip: String(
      Number(params?.pageParam) > 1 ? (Number(params?.pageParam) - 1) * DEFAULT_SKIP : 0
    ),
    limit: String(DEFAULT_LIMIT),
  };

  if (params?.search) {
    defaultParams = {
      ...defaultParams,
      q: params?.search || '',
    };
  }

  return new URLSearchParams(defaultParams);
};

export const productService = {
  getAllProducts(params?: Partial<ParamsProductRequest>): Promise<Products> {
    return request(`/products?${urlParams(params)}`);
  },

  getAllProductsBySearch(params?: Partial<ParamsProductRequest>): Promise<Products> {
    return request(`/products/search?${urlParams(params)}`);
  },
};
