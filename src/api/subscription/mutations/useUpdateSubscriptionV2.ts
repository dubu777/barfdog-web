import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types";
import { updateSubscriptionV2 } from "../subscription";

export function useUpdateSubscriptionV2(
  mutationOptions?: UseMutationCustomOptions
) {
  return useMutation({
    mutationFn: updateSubscriptionV2,
    ...mutationOptions,
  });
}
