import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { UseMutationCustomOptions } from "@/types";
import { deletePaymentMethod } from "@/api/mypage/subscription/subscription";

const getPaymentListQueryKey = [queryKeys.MYPAGE.BASE, queryKeys.MYPAGE.GET_PAYMENT_LIST];

export function useDeletePaymentMethod(mutationOptions?: UseMutationCustomOptions) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (cardId: number) => deletePaymentMethod(cardId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: getPaymentListQueryKey,
      });
    },
    ...mutationOptions,
  })
}