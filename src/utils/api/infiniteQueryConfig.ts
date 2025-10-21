import { QueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

export interface InfiniteQueryConfig<TData> {
  queryKey: (string | number)[];
  queryFn: (params: { pageParam: number; instance?: AxiosInstance }) => Promise<TData>;
}

/**
 * 무한 스크롤 쿼리 설정
 */
export function createInfiniteQueryConfig<TData>(
  config: InfiniteQueryConfig<TData>
) {
  return {
    queryKey: config.queryKey,
    queryFn: async ({ pageParam = 0 }: { pageParam: number }) => {
      const pageNumber = typeof pageParam === 'number' ? pageParam : 0;
      return await config.queryFn({ 
        pageParam: pageNumber
      });
    },
    getNextPageParam: (lastPage) => {
			if (!lastPage) return undefined;
      const currentPage = lastPage?.pagination 
        ? lastPage?.pagination?.page 
        : lastPage?.page?.number 
          ?? 0;
      const totalPages = lastPage?.pagination 
        ? lastPage?.pagination?.totalPages 
        : lastPage?.page?.totalPages 
          ?? 0;

			const nextPage = currentPage + 1;
			return nextPage < totalPages ? nextPage : undefined;
		},
		initialPageParam: 0,
  };
}

/**
 * SSR용 무한 스크롤 쿼리 prefetch
 */
export async function prefetchInfiniteQuery<TData>(
  queryClient: QueryClient,
  config: InfiniteQueryConfig<TData>,
  instance?: AxiosInstance
) {
  await queryClient.prefetchInfiniteQuery({
    queryKey: config.queryKey,
    queryFn: async ({ pageParam = 0 }) => {
      const pageNumber = typeof pageParam === 'number' ? pageParam : 0;
      return await config.queryFn({ 
        pageParam: pageNumber, 
        instance
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.page.page ?? 0;
      const totalPages = lastPage.page.totalPages ?? 0;
      return currentPage + 1 < totalPages ? currentPage + 1 : undefined;
    },
  });
}
