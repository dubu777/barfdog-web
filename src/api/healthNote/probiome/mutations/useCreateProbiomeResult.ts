import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types";
import { createProbiomeResult } from "../probiome";
import { CreateProbiomeResponse } from "@/types/healthNote/probiome";

export function useCreateProbiomeResult(
  mutationOptions?: UseMutationCustomOptions<CreateProbiomeResponse>
) {
  return useMutation({
    mutationFn: createProbiomeResult,
    ...mutationOptions,
  });
}
