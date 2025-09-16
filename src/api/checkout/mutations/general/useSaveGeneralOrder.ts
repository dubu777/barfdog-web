import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types";
import { saveGeneralOrder } from "../../checkout";

export function useSaveGeneralOrder(
  mutationOptions?: UseMutationCustomOptions
) {
  return useMutation({
    mutationFn: saveGeneralOrder,
    ...mutationOptions,
  });
}
