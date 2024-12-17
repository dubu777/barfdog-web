import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { getPlanDiscount } from "@/api/subscription/subscription";
import { PlanDiscountResponse, UseQueryCustomOptions } from "@/types";


export function useGetPlanDiscount(queryOptions?: UseQueryCustomOptions<PlanDiscountResponse>) {
  return useQuery({
    queryFn: () => getPlanDiscount(),
    queryKey: [queryKeys.SUBSCRIPTION.BASE, queryKeys.SUBSCRIPTION.GET_PLAN_DISCOUNT],
    ...queryOptions,
  })
}
