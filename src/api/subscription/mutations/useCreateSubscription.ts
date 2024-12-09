import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { PaymentBody, SubscriptionData, SubscriptionResponse } from "@/types";
import { createSubscription } from "../subscription";

interface UseCreateSubscriptionProps {
  onSuccess?: (data: SubscriptionResponse<SubscriptionData>) => void;
  onError?: (error: any) => void;
}

export function useCreateSubscription({
  onSuccess,
  onError,
}: UseCreateSubscriptionProps): UseMutationResult<
  SubscriptionResponse<SubscriptionData>,
  any,
  { subscribeId: number; body: PaymentBody },
  unknown
> {
  return useMutation({
    mutationFn: ({ subscribeId, body }: { subscribeId: number; body: PaymentBody }) =>
      createSubscription(subscribeId, body),
    onSuccess,
    onError,
  });
}