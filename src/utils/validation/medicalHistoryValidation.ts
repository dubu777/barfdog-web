import * as yup from "yup";
import { MedicalHistoryFormValue } from "@/types/healthNote/medicalHistory";

export const defaultMedicalHistoryValue = (petId: number, historyInfo?: MedicalHistoryFormValue) => {
	return {
		petId: petId ?? '',
		hospitalName: historyInfo?.hospitalName ?? '',
		diagnosisDate: historyInfo?.diagnosisDate ?? '',
		diagnosisItemList: historyInfo?.diagnosisItemList ?? [],
		note: historyInfo?.note ?? '',
	}
}

export const medicalHistorySchema = yup.object().shape({
	hospitalName: yup.string().required('병원이름은 필수입니다.'),
	diagnosisDate: yup.string().required('날짜는 필수입니다.'),
	diagnosisItemList: yup.array().of(yup.string()).min(1, '최소 1개 이상의 검사 항목이 필요합니다.'),
	note: yup.string().optional()
});
