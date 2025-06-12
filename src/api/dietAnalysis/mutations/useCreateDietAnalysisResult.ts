import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types";
import { createDietAnalysisResult } from "../dietAnalysis";
import { CreateDietAnalysisResultResponse } from "@/types/dietAnalysis";

export function useCreateDietAnalysisResult(
  mutationOptions?: UseMutationCustomOptions<CreateDietAnalysisResultResponse>
) {
  return useMutation({
    mutationFn: createDietAnalysisResult,
    ...mutationOptions,
  });
}
