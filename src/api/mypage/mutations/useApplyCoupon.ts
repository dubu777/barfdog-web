import {useMutation, useQueryClient} from "@tanstack/react-query";
import {applyCoupon} from "@/api/mypage/myPage";
import {queryKeys} from "@/constants";

export { useApplyCoupon };

function useApplyCoupon() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: { code: string }) => applyCoupon(body),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.COUPON, queryKeys.GET_COUPON_LIST],
      });
    },
  })
}