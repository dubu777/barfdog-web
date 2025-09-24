import axiosInstance from "@/api/axiosInstance";
import { AxiosInstance } from "axios";
import { ApiResponse, RecipeItem } from "@/types";
import { validateApiResponse } from "@/utils/api/apiResponseUtils";

const getRecipeList = async (instance: AxiosInstance = axiosInstance): Promise<RecipeItem[]> => {
  const { data }: { data: ApiResponse<Record<string, RecipeItem[]>> } = await instance.get('/api/v2/recipes/public');
  const responseData = validateApiResponse(data, '레시피 목록 조회에 실패했습니다.');
  return responseData.recipeList;
}

export { 
  getRecipeList
};
