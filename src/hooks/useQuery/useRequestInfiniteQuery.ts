import { DEFAULT_LIMIT } from '@/constants';
import { DataResponse } from '@/interfaces';
import { useMemo } from 'react';
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
  QueryKey,
  useInfiniteQuery,
} from 'react-query';

interface Return<TData, TError> {
  data: InfiniteData<TData> | undefined;
  isFetching?: boolean | undefined;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<TData, TError>>;
  hasNextPage: boolean | undefined;
  fallbackData?: TData[];
}

export function useRequestInfiniteQuery<TData = unknown, TError = unknown>(
  queryKey: QueryKey,
  apiRequest: any
): Return<DataResponse<TData>, TError> {
  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery<
    DataResponse<TData>,
    TError
  >(queryKey, apiRequest, {
    getNextPageParam: (lastPage, pages) => {
      const { total } = lastPage;
      const page = pages.length;

      if (page * DEFAULT_LIMIT < total) {
        return page + 1;
      }

      return undefined;
    },
  });

  return {
    data,
    isFetching,
    fetchNextPage,
    hasNextPage,
  };
}
