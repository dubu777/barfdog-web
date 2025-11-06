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
  const { data } = await axiosInstance.post(
    "/api/v2/user/recipes/survey",
    body
  );

  return data;
};

const getDietAnalysisResult = async (
  surveyId: number,
  instance: AxiosInstance = axiosInstance
): Promise<DietAnalysisResult> => {
  const { data } = await instance.get(
    `/api/v2/user/recipes/survey/${surveyId}/analysis`
  );

  return data.data;
};

export { createDietAnalysisResult, getDietAnalysisResult };
