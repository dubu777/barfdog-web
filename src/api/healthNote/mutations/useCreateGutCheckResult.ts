import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types";
import { createGutCheckResult } from "../healthNote";
import { CreateGutCheckResponse } from "@/types/healthNote/gutCheck";

export function useCreateGutCheckResult(
  mutationOptions?: UseMutationCustomOptions<CreateGutCheckResponse>
) {
  return useMutation({
    mutationFn: createGutCheckResult,
    ...mutationOptions,
  });
}
