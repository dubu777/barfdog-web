import { useCallback, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface UsePaginationProps {
  prefetchFn: (page: number) => Promise<void>;
}

export function usePagination({ prefetchFn }: UsePaginationProps) {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const queryClient = useQueryClient();

  const onPageChange = useCallback(async (page: number) => {
      if (page < 0 || page >= totalPages) return;

      await prefetchFn(page);

      setCurrentPage(page);
    },[queryClient, totalPages, prefetchFn]
  );

  const setPaginationData = useCallback((page: { totalPages: number; number: number; }) => {
    setTotalPages(page.totalPages);
    setCurrentPage(page.number);
  }, []);

  return { currentPage, totalPages, setPaginationData, onPageChange };
}