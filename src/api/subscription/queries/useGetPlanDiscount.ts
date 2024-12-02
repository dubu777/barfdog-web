import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { getPlanDiscount } from "@/api/subscription/subscription";
import { PlanDiscountResponse, UseQueryCustomOptions } from "@/types";


export function useGetPlanDiscount(queryOptions?: UseQueryCustomOptions<PlanDiscountResponse>) {
  return useQuery({
    queryFn: () => getPlanDiscount(),
    queryKey: [queryKeys.SUBSCRIPTION, queryKeys.GET_PLAN_DISCOUNT],
    ...queryOptions,
  })
}
