import { useMutation, useQueryClient } from "@tanstack/react-query";
import { skipSubscribe } from "@/api/mypage/myPage";
import { queryKeys } from "@/constants";
import { SubscribeSkipType } from "@/types";

export { useSkipSubscription };

function useSkipSubscription(subscribeId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ skipType }: { skipType: SubscribeSkipType }) => skipSubscribe(subscribeId, skipType),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.SUBSCRIPTION, queryKeys.GET_SUBSCRIPTION_BY_ID, subscribeId]
      });
    },
  })
}