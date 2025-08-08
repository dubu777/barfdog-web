import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { MedicalHistoryFormValue } from "@/types/healthNote/medicalHistory";
import { createMedicalHistory } from "@/api/healthNote/medicalHistory/medicalHistory";

export function useCreateMedicalHistory(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: ({ body }: { body: MedicalHistoryFormValue }) => createMedicalHistory(body),
		...mutationOptions,
	})
}
