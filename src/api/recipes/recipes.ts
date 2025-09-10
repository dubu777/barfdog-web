import axiosInstance from "@/api/axiosInstance";
import { AxiosInstance } from "axios";
import { RecipeDto } from "@/types";

const getRecipeList = async (instance: AxiosInstance = axiosInstance): Promise<RecipeDto[]> => {
  const { data } = await instance.get('/api/recipes');
  return data._embedded.recipeListResponseDtoList.sort((a, b) => a.id - b.id);
}
export { 
  getRecipeList
};
