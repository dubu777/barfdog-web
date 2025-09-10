import Divider from "@/components/common/divider/Divider";
import { commonWrapper } from "@/styles/common.css";
import { IngredientType } from "@/types/recipes";
import MainIngredients from "./mainIngredients/MainIngredients";
import AllIngredients from "./allIngredients/AllIngredients";
import GuaranteedAnalysis from "./guaranteedAnalysis/GuaranteedAnalysis";

interface RecipeIngredientsProps {
  recipeId: number;
  ingredients?: IngredientType[]
  totalIngredients?: string;
}

export default function RecipeIngredients({
  recipeId,
  ingredients,
  totalIngredients,
}: RecipeIngredientsProps) {
  return (
    <div className={commonWrapper({ direction: 'col', padding: '40/20', gap: 40 })}>
      <MainIngredients recipeId={recipeId} ingredients={ingredients} />
      <Divider thickness={1} color="gray200" />
      <AllIngredients recipeId={recipeId} totalIngredients={totalIngredients} />
      <Divider thickness={1} color="gray200" />
      <GuaranteedAnalysis recipeId={recipeId} />
    </div>
  );
}