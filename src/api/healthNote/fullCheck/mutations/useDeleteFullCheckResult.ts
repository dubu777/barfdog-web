import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { deleteFullCheckResult } from "@/api/healthNote/fullCheck/fullCheck";

export function useDeleteFullCheckResult(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: ({ diagnosisId }: { diagnosisId: number }) => deleteFullCheckResult(diagnosisId),
		...mutationOptions,
	})
}
