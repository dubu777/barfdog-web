import {
  CreateDietAnalysisResultResponse,
  DietAnalysisPayload,
  DietAnalysisResult,
} from "@/types/dietAnalysis";
import axiosInstance from "../axiosInstance";
import { AxiosInstance } from "axios";

const createDietAnalysisResult = async (
  body: DietAnalysisPayload
): Promise<CreateDietAnalysisResultResponse> => {
  const { data } = await axiosInstance.post("/api/v2/recipeSurvey", body);

  return data;
};

const getDietAnalysisResult = async (
  reportId: number,
  instance: AxiosInstance = axiosInstance
): Promise<DietAnalysisResult> => {
  const { data } = await instance.get(`/api/surveyReports/${reportId}/result`);

  return data;
};

export { createDietAnalysisResult, getDietAnalysisResult };
