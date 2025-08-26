import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { BodyPartMap, BodyPartType } from "@/types/healthNote/bodyCheck";
import { createBodyCheckResult } from "@/api/healthNote/bodyCheck/bodyCheck";

export function useCreateBodyCheckResult<P extends BodyPartType>(
	mutationOptions?: UseMutationCustomOptions<BodyPartMap[P]["response"]>
) {
	return useMutation<
		BodyPartMap[P]["response"],
		Error,
		{ part: P; body: BodyPartMap[P]["form"] }
		>({
		mutationFn: ({ part, body }) => createBodyCheckResult(part, body),
		...mutationOptions,
	});
}
