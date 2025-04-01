import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSubscriptionAddress } from "@/api/subscription/subscription";
import { queryKeys } from "@/constants";
import { AddressDto, UseMutationCustomOptions } from "@/types";

export { useUpdateSubscriptionAddress };

function useUpdateSubscriptionAddress(subscribeId: number, changeType: string, mutationOptions?: UseMutationCustomOptions) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ body }: { body: AddressDto }) => updateSubscriptionAddress(subscribeId, changeType, body),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.SUBSCRIPTION.BASE, queryKeys.SUBSCRIPTION.GET_SUBSCRIPTION_ADDRESS, subscribeId]
      });
    },
    ...mutationOptions,
  })
}