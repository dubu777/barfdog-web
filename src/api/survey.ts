import { SurveyResult } from "@/types/survey";
import axiosInstance from "./axiosInstance";


const getSurveyRecipe = async (id: number): Promise<SurveyResult> => {
  const {data} = await axiosInstance.get(`/api/surveyReports/${id}/result`);

  return data
}
const getSurveyResult = async (id: number) => {
  const {data} = await axiosInstance.get(`/api/surveyReports/${id}`);

  return data
}




export {getSurveyRecipe, getSurveyResult}