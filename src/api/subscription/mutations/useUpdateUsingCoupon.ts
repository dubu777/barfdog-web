import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUsingCoupon } from "@/api/subscription/subscription";
import { queryKeys } from "@/constants";
import { UseMutationCustomOptions, UsingCoupon } from "@/types";

export { useUpdateUsingCoupon };

type UpdateUsingCouponResponse = Awaited<ReturnType<typeof updateUsingCoupon>>;

function useUpdateUsingCoupon(mutationOptions?: UseMutationCustomOptions<UpdateUsingCouponResponse>) {
  const queryClient = useQueryClient();
  return useMutation<
    UpdateUsingCouponResponse,
    unknown, // error type 정의 필요
    { subscriptionId: number; body: UsingCoupon }
  >({
    mutationFn: ({ subscriptionId, body }) => updateUsingCoupon(subscriptionId, body),
    onSuccess: async (response) => {
      const subscriptionId = response.subscriptionId;
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [queryKeys.SUBSCRIPTION.BASE, queryKeys.SUBSCRIPTION.GET_SUBSCRIPTION_DETAIL, subscriptionId]
        }),
      ])
    },
    ...mutationOptions,
  })
}