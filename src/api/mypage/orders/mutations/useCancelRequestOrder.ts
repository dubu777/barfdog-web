import { cancelRequestOrder } from "../order";
import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types";
import { CancelRequestBody, OrderType } from "@/types/mypage/orders";

export function useCancelRequestOrder(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: ({ 
      orderId,
      orderType,
      body,
    }: { 
      orderId: number;
      orderType: OrderType;
      body: CancelRequestBody;
    }) => cancelRequestOrder(orderId, orderType, body),
    ...mutationOptions,
  })
}