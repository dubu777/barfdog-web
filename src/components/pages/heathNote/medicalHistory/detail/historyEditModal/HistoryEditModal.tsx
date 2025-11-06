import axios from "axios";
import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import HistoryForm from "@/components/pages/heathNote/medicalHistory/form/HistoryForm";
import FullModalWrapper from "@/components/ui/fullModalWrapper/FullModalWrapper";
import { useToastStore } from "@/store/useToastStore";
import { queryKeys } from "@/constants";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useMultiFileUpload } from "@/hooks/useMultiFileUpload";
import { defaultMedicalHistoryValue, medicalHistorySchema } from "@/utils/validation/medicalHistoryValidation";
import { DiagnosisFileList, MedicalHistoryFormValue } from "@/types/healthNote/medicalHistory";
import { useUpdateMedicalHistory } from "@/api/healthNote/medicalHistory/mutations/useUpdateMedicalHistory";

interface HistoryEditModalProps {
	diagnosisId: number;
	data: MedicalHistoryFormValue;
	isOpen: boolean;
	onClose: () => void;
	initialFiles: DiagnosisFileList[];
}

export default function HistoryEditModal ({
	diagnosisId,
	data,
	isOpen,
	onClose,
	initialFiles,
}: HistoryEditModalProps) {
	const queryClient = useQueryClient();
	const { addToast } = useToastStore();

	const isFirstRender = useRef(true);

	const { mutate } = useUpdateMedicalHistory();
	const { handleSubmit, control, errors, isValid } = useFormHandler<MedicalHistoryFormValue>(medicalHistorySchema, defaultMedicalHistoryValue(data.petId, data));
	const {
		uploadedFiles,
		uploadFile,
		removeFile,
		cancelUpload,
		fileChangeInfo
	} = useMultiFileUpload({
		initialFiles: initialFiles,
		fileKey: 'uploadDiagnosisFile',
		uploadApiUrl: '/api/v2/health-book/medical-diagnoses/files',
		deleteApiUrl: '/api/v2/health-book/medical-diagnoses/files',
		cancelApiUrl: `/api/v2/health-book/medical-diagnoses/${diagnosisId}/cancel`,
		getExtraFormData: () => ({
			uploadDiagnosisInfo: {
				petId: data.petId,
				diagnosisId: diagnosisId,
			},
		}),
	})

useEffect(() => {
	// 초기 렌더링시 cleanup 함수 실행하지 않도록 처리
	if (isFirstRender.current) {
		isFirstRender.current = false;
		return;
	}

	// 모달이 닫힐 경우 return
	if (!isOpen) return;

	// 컴포넌트가 언마운트 되거나 의존성 배열이 바뀌어 effect가 다시 실행될 때 호출됨
	return () => {
		cancelUpload();
	};
}, []);

	const onSubmit = (data) => {
		const body = {
			...data,
			fileChangeInfo,
		}

		mutate({
			diagnosisId,
			body
		}, {
			onSuccess: async () => {
				addToast("병원 진료 기록이 수정되었습니다.");
				await Promise.all([
					queryClient.invalidateQueries({
						queryKey: [queryKeys.MEDICAL_HISTORY.BASE, queryKeys.MEDICAL_HISTORY.GET_MEDICAL_HISTORY_DETAIL, diagnosisId],
					}),
					queryClient.invalidateQueries({
						queryKey: [queryKeys.MEDICAL_HISTORY.BASE, queryKeys.MEDICAL_HISTORY.GET_MEDICAL_HISTORY_LIST],
					}),
				])
				onClose();
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
		<FullModalWrapper isVisible={isOpen} headerTitle='병원 진료 기록 수정' handleClose={onClose}>
			<HistoryForm
				errors={errors}
				control={control}
				handleSubmit={handleSubmit(onSubmit)}
				isValid={isValid}
				uploadedFiles={uploadedFiles}
				uploadFile={uploadFile}
				removeFile={removeFile}
			/>
		</FullModalWrapper>
	);
};