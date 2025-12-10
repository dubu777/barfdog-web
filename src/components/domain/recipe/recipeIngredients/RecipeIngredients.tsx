import { forwardRef } from "react";
import Divider from "@/components/ui/divider/Divider";
import MainIngredients from "./mainIngredients/MainIngredients";
import AllIngredients from "./allIngredients/AllIngredients";
import GuaranteedAnalysis from "./guaranteedAnalysis/GuaranteedAnalysis";
import { recipeIngredientsWrapper } from "../Recipe.css";

interface RecipeIngredientsProps {
  recipeId: number; // useGetRawFoodOrderSheet 데이터 바인딩 후 제거
  ingredients: string[]; // useGetRawFoodOrderSheet 데이터 바인딩 후 필수값 으로 변경
  totalIngredients?: string;
}

const RecipeIngredients = forwardRef<HTMLDivElement, RecipeIngredientsProps>(
  function RecipeIngredients({ recipeId, ingredients, totalIngredients }, ref) {
    return (
      <section ref={ref} className={recipeIngredientsWrapper}>
        <MainIngredients recipeId={recipeId} ingredients={ingredients} />
        <Divider height={1} color="gray200" />
        <AllIngredients
          recipeId={recipeId}
          totalIngredients={totalIngredients}
        />
        <Divider height={1} color="gray200" />
        <GuaranteedAnalysis recipeId={recipeId} />
      </section>
    );
  }
);
RecipeIngredients.displayName = "RecipeIngredients";

export default RecipeIngredients;
