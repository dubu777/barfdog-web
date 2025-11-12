import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types";
import { updateSubscription } from "../subscription";
import { queryKeys } from "@/constants";

export function useUpdateSubscription(
  mutationOptions?: UseMutationCustomOptions
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSubscription,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [
          queryKeys.SUBSCRIPTION.BASE,
          queryKeys.SUBSCRIPTION.GET_SUBSCRIPTION_INFO,
        ],
      });
    },
    ...mutationOptions,
  });
}
