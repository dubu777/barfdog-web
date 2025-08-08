import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { updateMedicalHistory } from "@/api/healthNote/medicalHistory/medicalHistory";
import { MedicalHistoryFormValue } from "@/types/healthNote/medicalHistory";

export function useUpdateMedicalHistory(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: ({ 
			diagnosisId, 
			body
		}: { 
			diagnosisId: number, 
			body: MedicalHistoryFormValue
		}) => updateMedicalHistory(diagnosisId, body),
		...mutationOptions,
	})
}
