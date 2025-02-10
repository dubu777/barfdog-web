import { useCallback, useState } from "react";
import { QueryParams } from "@/types";
import { useSearchParams } from "next/navigation";

interface UsePaginationProps {
  prefetchFn: (page: number) => Promise<void>;
  pushWithQuery: (path: string, newQuery: QueryParams, removeQueryKeys?: string[], preserveScroll?: boolean) => void;
  preserveScroll?: boolean;
}

export function usePagination({ prefetchFn, pushWithQuery, preserveScroll = false }: UsePaginationProps) {
  const searchParams = useSearchParams();
  const pageParam = Number(searchParams.get('page')) > 0 && (Number(searchParams.get('page')) - 1) || 0;

  const [totalPages, setTotalPages] = useState<number>(1);
  const currentPage = pageParam;

  const onPageChange = useCallback(async (page: number) => {
      if (page < 0 || page >= totalPages) return;

      pushWithQuery(window.location.pathname, { page: page + 1 }, [], preserveScroll);
      await prefetchFn(page);

    },[totalPages, prefetchFn, pushWithQuery]
  );

  const setPaginationData = useCallback((page: { totalPages: number; number: number; }) => {
    setTotalPages(page.totalPages);
  }, []);

  return { currentPage, totalPages, setPaginationData, onPageChange };
}