import { RecipeData, ResultData } from "@/types/survey";
import axiosInstance from "./axiosInstance";
import { PlanDiscountResponse } from "@/types/subscription";


const getDiscountInfo = async (): Promise<PlanDiscountResponse> => {
  const {data} = await axiosInstance.get('/api/planDiscount');

  return data
}



export {getDiscountInfo}