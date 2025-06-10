import * as yup from "yup";
import {HealthCheckHistoryFormValue} from "@/types/healthNote";

export const defaultHealthCheckHistoryValue = (historyInfo: HealthCheckHistoryFormValue | null) => {
	return {
		hospitalName: historyInfo?.hospitalName || '',
		date: historyInfo?.date || '',
		testItems: historyInfo?.testItems || [],
		note: historyInfo?.note || '',
	}
}

export const healthCheckHistorySchema = yup.object().shape({
	hospitalName: yup.string().required('병원이름은 필수입니다.'),
	date: yup.string().required('날짜는 필수입니다.'),
	testItems: yup.array().of(yup.string()).min(1, '최소 1개 이상의 검사 항목이 필요합니다.'),
	note: yup.string().optional()
});
