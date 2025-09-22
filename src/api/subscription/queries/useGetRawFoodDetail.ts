import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { RawFoodDetailResponse, UseQueryCustomOptions } from "@/types";
import { getRawFoodDetail } from "../subscription";

export function useGetRawFoodDetail(
  recipeId: number,
  queryOptions?: UseQueryCustomOptions<RawFoodDetailResponse>
) {
  return useQuery<RawFoodDetailResponse>({
    queryKey: [
      queryKeys.SUBSCRIPTION.BASE,
      queryKeys.SUBSCRIPTION.GET_RAW_DETAIL,
      recipeId,
    ],
    queryFn: () => getRawFoodDetail(recipeId),
    ...queryOptions,
  });
}
