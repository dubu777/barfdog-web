import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { createPromotion } from "@/api/mypage/promotion/promotion";
import { CreatePromotion } from "@/types/mypage/promotion";

export function useCreatePromotion(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: (body: CreatePromotion) => createPromotion(body),
		...mutationOptions,
	})
}
