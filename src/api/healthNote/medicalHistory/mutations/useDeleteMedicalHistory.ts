import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { deleteMedicalHistory } from "@/api/healthNote/medicalHistory/medicalHistory";

export function useDeleteMedicalHistory(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: ({ diagnosisId }: { diagnosisId: number }) => deleteMedicalHistory(diagnosisId),
		...mutationOptions,
	})
}
