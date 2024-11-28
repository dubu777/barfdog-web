import { useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { getPlanDiscount } from "@/api/subscription/subscription";


export function useGetPlanDiscount() {
  return useSuspenseQuery({
    queryKey: [queryKeys.SUBSCRIPTION, queryKeys.GET_PLAN_DISCOUNT],
    queryFn: () => getPlanDiscount(),
  })
}
