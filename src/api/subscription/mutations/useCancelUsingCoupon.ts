import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelUsedCoupon } from "@/api/subscription/subscription";
import { queryKeys } from "@/constants";
import { UseMutationCustomOptions } from "@/types";

export { useCancelUsingCoupon };

type CancelUsedCouponResponse = Awaited<ReturnType<typeof cancelUsedCoupon>>;

function useCancelUsingCoupon(mutationOptions?: UseMutationCustomOptions<CancelUsedCouponResponse>) {
  const queryClient = useQueryClient();

  return useMutation<
    CancelUsedCouponResponse, 
    unknown, // error type 정의 필요
    { subscriptionId: number; usingCouponId: number }
  >({
    mutationFn: ({ subscriptionId, usingCouponId }) => cancelUsedCoupon(subscriptionId, usingCouponId),
    onSuccess: async (response) => {
      const subscriptionId = response.subscriptionId;
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [queryKeys.COUPON.BASE, queryKeys.COUPON.GET_COUPON_LIST]
        }),
        queryClient.invalidateQueries({
          queryKey: [queryKeys.SUBSCRIPTION.BASE, queryKeys.SUBSCRIPTION.GET_SUBSCRIPTION_DETAIL, subscriptionId]
        }),
      ])
    },
    ...mutationOptions,
  })
}