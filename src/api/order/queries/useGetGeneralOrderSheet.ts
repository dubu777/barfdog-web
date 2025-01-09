import { QueryClient, useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { getGeneralOrderSheet } from "../order";
import { GeneralOrderSheetRequest, UseMutationCustomOptions } from "@/types";
import { queryKeys } from "@/constants";


// get 요청으로 해야 할 것을 request body가 복잡해서 post로 보내는 중
export function useGetGeneralOrderSheet(queryClient: QueryClient, mutationOptions?: UseMutationCustomOptions) {
  const getCacheKey = (variables: GeneralOrderSheetRequest) => [queryKeys.ORDER.GET_GENERAL_ORDER_SHEET, variables];
  return useMutation({
    mutationFn: getGeneralOrderSheet,
    onSuccess: (data, variables) => {
      // POST 요청 결과를 캐싱
      const cacheKey = getCacheKey(variables);
      queryClient.setQueryData(cacheKey, data);
    },
    ...mutationOptions,
  });
}

// post 요청 캐싱
export function useCachedGeneralOrderSheet(variables: GeneralOrderSheetRequest) {
  const cacheKey = [queryKeys.ORDER.GET_GENERAL_ORDER_SHEET, variables];
  return useSuspenseQuery({
    queryFn: () => getGeneralOrderSheet(variables),
    queryKey: cacheKey,
  });
}
