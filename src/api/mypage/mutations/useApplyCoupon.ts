import { useMutation, useQueryClient } from "@tanstack/react-query";
import { applyCoupon } from "@/api/mypage/myPage";
import { queryKeys } from "@/constants";
import { UseMutationCustomOptions } from "@/types";

export { useApplyCoupon };

const getCouponListQueryKey = [queryKeys.COUPON.BASE, queryKeys.COUPON.GET_COUPON_LIST];

function useApplyCoupon(mutationOptions?: UseMutationCustomOptions) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: { code: string }) => applyCoupon(body),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: getCouponListQueryKey,
      });
    },
    ...mutationOptions,
  })
}