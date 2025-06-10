import { useMutation } from "@tanstack/react-query";
import { createDietAnalysisResult } from "@/api/dog/dog";
import { UseMutationCustomOptions } from "@/types";

export function useCreateDietAnalysisResult(
  mutationOptions?: UseMutationCustomOptions
) {
  return useMutation({
    mutationFn: createDietAnalysisResult,
    ...mutationOptions,
  });
}
