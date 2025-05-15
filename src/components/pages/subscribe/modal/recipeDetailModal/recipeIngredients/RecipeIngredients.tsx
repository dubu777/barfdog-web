import { commonWrapper } from "@/styles/common.css";
import { forwardRef } from "react";
import { recipeDetailSection } from "../RecipeDetailModal.css";

interface RecipeIngredientsProps {

}

const RecipeIngredients = forwardRef<HTMLDivElement, RecipeIngredientsProps>(
  function RecipeIngredients({ }, ref) {
    return (
      <section ref={ref} className={recipeDetailSection}>
        <div>RecipeIngredients</div>
        <div>RecipeIngredients</div>
        <div>RecipeIngredients</div>
        <div>RecipeIngredients</div>
        <div>RecipeIngredients</div>
        <div>RecipeIngredients</div>
        <div>RecipeIngredients</div>
        <div>RecipeIngredients</div>
        <div>RecipeIngredients</div>
        <div>RecipeIngredients</div>
        <div>RecipeIngredients</div>
        <div>RecipeIngredients</div>
        <div>RecipeIngredients</div>
        <div>RecipeIngredients</div>
        <div>RecipeIngredients</div>
        <div>RecipeIngredients</div>
        <div>RecipeIngredients</div>
      </section>
    );
  }
);

RecipeIngredients.displayName = "RecipeIngredients";

export default RecipeIngredients;