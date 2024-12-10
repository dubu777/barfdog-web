import axiosInstance from "@/api/axiosInstance";
import {RecipeDto} from "@/types";

export { getRecipeList };

const getRecipeList = async (): Promise<RecipeDto[]> => {
  const { data } = await axiosInstance.get('/api/recipes');
  return data._embedded.recipeListResponseDtoList.sort((a, b) => a.id - b.id);
}