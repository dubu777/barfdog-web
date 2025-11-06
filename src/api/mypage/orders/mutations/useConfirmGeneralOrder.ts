import { confirmGeneralOrder } from "../order";
import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types";
import { ConfirmGeneralOrderBody } from "@/types/mypage/orders";

export function useConfirmGeneralOrder(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: ({ 
      body,
    }: { 
      body: ConfirmGeneralOrderBody;
    }) => confirmGeneralOrder(body),
    ...mutationOptions,
  })
}