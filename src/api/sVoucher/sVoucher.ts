import axios from "axios";
import { ObesityDetailResponse } from "@/types/sVoucher";

const getObesityDetail = async (surveyId: number): Promise<ObesityDetailResponse> => {
	const res = await axios.get(`/api/obesity`, {
		params: { surveyId },
	});
	return res.data;
};

const uploadObesityImage = async (file: File, weight: number) => {
	const formData = new FormData();
	formData.append('file', file);
	formData.append('weight', weight.toString());

	const { data } = await axios.post('/api/obesity-upload', formData);
	return data;
};

export {
	getObesityDetail,
	uploadObesityImage,
}