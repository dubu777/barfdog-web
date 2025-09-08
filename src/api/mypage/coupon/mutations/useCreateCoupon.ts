import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCoupon } from "@/api/mypage/coupon/coupon";
import { queryKeys } from "@/constants";
import { UseMutationCustomOptions } from "@/types";

const getCouponListQueryKey = [queryKeys.COUPON.BASE, queryKeys.COUPON.GET_COUPON_LIST];

export function useCreateCoupon(mutationOptions?: UseMutationCustomOptions) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ code }: { code: string }) => createCoupon(code),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: getCouponListQueryKey,
      });
    },
    ...mutationOptions,
  })
}