import { forwardRef } from "react";
import { recipeDetailSection } from "../RecipeDetailModal.css";

const RecipeIngredients = forwardRef<HTMLDivElement>(function RecipeIngredients(
  {},
  ref
) {
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
});

RecipeIngredients.displayName = "RecipeIngredients";

export default RecipeIngredients;
