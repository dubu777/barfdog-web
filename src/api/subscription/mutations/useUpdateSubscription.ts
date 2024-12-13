import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types";
import { updateSubscription } from "../subscription";


export function useUpdateSubscription(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: updateSubscription,
    ...mutationOptions,
  })
}