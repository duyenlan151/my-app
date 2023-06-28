import { Products } from '@/interfaces';
import { productService } from '@/services';
import { useRequestInfiniteQuery } from './useQuery';

export function useProducts({ search }: { search: string }) {
  const { data, isFetching, fetchNextPage, hasNextPage } = useRequestInfiniteQuery<Products, any>(
    ['getAllProducts', search],
    async ({ pageParam = 1 }) =>
      (await search)
        ? productService.getAllProductsBySearch({ pageParam, search: String(search || '') })
        : productService.getAllProducts({ pageParam })
  );

  return { data, isFetching, fetchNextPage, hasNextPage };
}
