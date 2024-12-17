import { useMutation, useQueryClient } from "@tanstack/react-query";
import { skipSubscription } from "@/api/subscription/subscription";
import { queryKeys } from "@/constants";
import { SubscriptionSkipType, UseMutationCustomOptions } from "@/types";

export { useSkipSubscription };

function useSkipSubscription(subscribeId: number, mutationOptions?: UseMutationCustomOptions) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ skipType }: { skipType: SubscriptionSkipType }) => skipSubscription(subscribeId, skipType),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.SUBSCRIPTION.BASE, queryKeys.SUBSCRIPTION.GET_SUBSCRIPTION_DETAIL, subscribeId]
      });
    },
    ...mutationOptions,
  })
}