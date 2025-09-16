import {
  QueryClient,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { getGeneralOrder } from "../checkout";
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
  return useSuspenseQuery({
    queryKey: [queryKeys.ORDER.BASE, queryKeys.ORDER.GET_GENERAL_ORDER, body],
    queryFn: () => getGeneralOrder(body),
    ...queryOptions,
  });
}
