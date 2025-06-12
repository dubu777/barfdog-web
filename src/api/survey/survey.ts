import { ResultData } from "@/types/survey";
import axiosInstance from "../axiosInstance";

const getSurveyResult = async (reportId: number): Promise<ResultData> => {
  const { data } = await axiosInstance.get(`/api/surveyReports/${reportId}`);

  return data;
};

export { getSurveyResult };
