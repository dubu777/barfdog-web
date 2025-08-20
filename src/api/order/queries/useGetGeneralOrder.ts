import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { getGeneralOrder } from "../order";
import {
  GeneralOrderSheetRequest,
  GeneralOrderSheetResponse,
  UseSuspenseQueryCustomOptions,
} from "@/types";
import { queryKeys } from "@/constants";

export function useGetGeneralOrder(
  body: GeneralOrderSheetRequest,
  queryOptions?: UseSuspenseQueryCustomOptions<GeneralOrderSheetResponse>
) {
  const queryClient = new QueryClient();
  return useSuspenseQuery({
    queryKey: [queryKeys.ORDER.BASE, queryKeys.ORDER.GET_GENERAL_ORDER, body],
    queryFn: () => getGeneralOrder(body),
    initialData: () => {
      return queryClient.getQueryData([
        queryKeys.ORDER.BASE,
        queryKeys.ORDER.GET_GENERAL_ORDER,
      ]);
    },
    ...queryOptions,
  });
}
