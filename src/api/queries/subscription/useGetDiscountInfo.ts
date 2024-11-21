import { QueryClient, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getSurveyRecipe } from "../../survey";
import { queryKeys } from "@/constants/queryKeys";
import { getDiscountInfo } from "@/api/subscription";


export function useGetDiscountInfo() {
  return useSuspenseQuery({
    queryKey: [queryKeys.SUBSCRIPTION, queryKeys.GET_DISCOUNT_INFO],
    queryFn: () => getDiscountInfo(),
  })
}
