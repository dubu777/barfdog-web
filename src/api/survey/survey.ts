import { ResultData } from "@/types/survey";
import axiosInstance from "../axiosInstance";

const getSurveyResult = async (surveyId: number): Promise<ResultData> => {
  const { data } = await axiosInstance.get(`/api/surveyReports/${surveyId}`);

  return data;
};

export { getSurveyResult };
