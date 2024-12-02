import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { PaymentBody, SubscriptionData, SubscriptionResponse, UseMutationCustomOptions } from "@/types";
import { createSubscription } from "../subscription";


export function useCreateSubscription(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: ({ subscribeId, body }: { subscribeId: number; body: PaymentBody }) =>
      createSubscription(subscribeId, body),
    ...mutationOptions,
  });
}