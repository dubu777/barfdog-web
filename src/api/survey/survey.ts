import { RecipeData, ResultData } from "@/types/survey";
import axiosInstance from "../axiosInstance";


const getSurveyRecipe = async (reportId: number): Promise<RecipeData> => {
  const {data} = await axiosInstance.get(`/api/surveyReports/${reportId}/result`);

  return data
}
const getSurveyResult = async (reportId: number): Promise<ResultData> => {
  const {data} = await axiosInstance.get(`/api/surveyReports/${reportId}`);

  return data
}

export {getSurveyRecipe, getSurveyResult}