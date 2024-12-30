import { useCallback, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { QueryParams } from "@/types";
import { useSearchParams } from "next/navigation";

interface UsePaginationProps {
  prefetchFn: (page: number) => Promise<void>;
  pushWithQuery: (path: string, newQuery: QueryParams) => void;
}

export function usePagination({ prefetchFn, pushWithQuery }: UsePaginationProps) {
  const searchParams = useSearchParams();
  const pageParam = Number(searchParams.get('page')) - 1 || 0;

  const [currentPage, setCurrentPage] = useState<number>(pageParam || 0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const queryClient = useQueryClient();

  const onPageChange = useCallback(async (page: number) => {
      if (page < 0 || page >= totalPages) return;

      pushWithQuery(window.location.pathname, { page: page + 1 });
      await prefetchFn(page);

      setCurrentPage(page);
    },[queryClient, totalPages, prefetchFn, pushWithQuery]
  );

  const setPaginationData = useCallback((page: { totalPages: number; number: number; }) => {
    setTotalPages(page.totalPages);
    setCurrentPage(page.number);
  }, []);

  return { currentPage, totalPages, setPaginationData, onPageChange };
}