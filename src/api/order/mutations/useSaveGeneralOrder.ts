import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types";
import { saveGeneralOrder } from "../order";

export function useSaveGeneralOrder(
  mutationOptions?: UseMutationCustomOptions
) {
  return useMutation({
    mutationFn: saveGeneralOrder,
    ...mutationOptions,
  });
}
