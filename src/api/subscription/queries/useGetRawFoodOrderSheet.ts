import { useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { RawFoodOrderSheet, UseSuspenseQueryCustomOptions } from "@/types";
import { getRawFoodOrderSheet } from "../subscription";

export function useGetRawFoodOrderSheet(
  reportId: number,
  queryOptions?: UseSuspenseQueryCustomOptions<RawFoodOrderSheet>
) {
  return useSuspenseQuery<RawFoodOrderSheet>({
    queryKey: [
      queryKeys.ORDER.BASE,
      queryKeys.ORDER.GET_RAW_ORDER_SHEET,
      reportId,
    ],
    queryFn: () => getRawFoodOrderSheet(reportId),
    ...queryOptions,
  });
}
