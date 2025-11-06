import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { CheckupDiagnosis, FullCheckFormValues } from "@/types/healthNote/fullCheck";
import { createFullCheckResult } from "@/api/healthNote/fullCheck/fullCheck";

export function useCreateFullCheckResult(mutationOptions?: UseMutationCustomOptions<CheckupDiagnosis>) {
	return useMutation({
		mutationFn: ({ body }: { body: FullCheckFormValues }) => createFullCheckResult(body),
		...mutationOptions,
	})
}
