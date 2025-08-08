'use client';
import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import HistoryForm from "@/components/pages/heathNote/medicalHistory/form/HistoryForm";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useMultiFileUpload } from "@/hooks/useMultiFileUpload";
import { useToastStore } from "@/store/useToastStore";
import { queryKeys } from "@/constants";
import { defaultMedicalHistoryValue, medicalHistorySchema } from "@/utils/validation/medicalHistoryValidation";
import { useCreateMedicalHistory } from "@/api/healthNote/medicalHistory/mutations/useCreateMedicalHistory";
import { MedicalHistoryFormValue } from "@/types/healthNote/medicalHistory";

interface CreateHistoryProps {
	petId: number;
}

export default function CreateHistory ({ petId }: CreateHistoryProps) {
	const router = useRouter();
	const queryClient = useQueryClient();
	const { addToast } = useToastStore();

	const { mutate } = useCreateMedicalHistory();

	const { handleSubmit, control, errors, isValid } = useFormHandler<MedicalHistoryFormValue>(
		medicalHistorySchema,
		defaultMedicalHistoryValue(petId)
	);

	const {
		uploadedFiles,
		uploadFile,
		removeFile,
		cancelUpload,
		fileChangeInfo
	} = useMultiFileUpload({
		fileKey: 'uploadDiagnosisFile',
		uploadApiUrl: '/api/v2/health-book/medical-diagnoses/files',
		deleteApiUrl: '/api/v2/health-book/medical-diagnoses/files',
		cancelApiUrl: `/api/v2/health-book/medical-diagnoses/draft/${petId}/cancel`,
		getExtraFormData: () => ({
			uploadDiagnosisInfo: {
				petId: petId,
				diagnosisId: null,
			},
		}),
	})

	useEffect(() => {
		return () => {
			cancelUpload();
		};
	}, [])

	const onSubmit = (data) => {
		const body = {
			...data,
			fileChangeInfo,
		}

		mutate({
			body
		}, {
			onSuccess: async () => {
				addToast("병원 진료 기록이 등록되었습니다.", 'above-button');

				const diagnosisId = data?.diagnosisId;
				await queryClient.invalidateQueries({
					queryKey: [queryKeys.MEDICAL_HISTORY.BASE, queryKeys.MEDICAL_HISTORY.GET_MEDICAL_HISTORY_DETAIL, diagnosisId],
				});
				router.push(`/health-note/medical-history/${diagnosisId}?petId=${petId}`)
			},
			onError: (error) => {
				if(axios.isAxiosError(error)) {
					addToast(error.message, 'above-button');
				}
				console.log(error);
			}
		})
	}

	return (
		<section>
			<HistoryForm
				errors={errors}
				control={control}
				handleSubmit={handleSubmit(onSubmit)}
				isValid={isValid}
				uploadedFiles={uploadedFiles}
				uploadFile={uploadFile}
				removeFile={removeFile}
			/>
		</section>
	);
};