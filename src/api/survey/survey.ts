import { RecipeData, ResultData } from "@/types/survey";
import axiosInstance from "../axiosInstance";


const getSurveyRecipe = async (id: number): Promise<RecipeData> => {
  const {data} = await axiosInstance.get(`/api/surveyReports/${id}/result`);

  return data
}
const getSurveyResult = async (id: number): Promise<ResultData> => {
  const {data} = await axiosInstance.get(`/api/surveyReports/${id}`);

  return data
}

export {getSurveyRecipe, getSurveyResult}