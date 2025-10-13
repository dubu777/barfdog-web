import { forwardRef } from "react";
import { recipeDetailSection } from "../RecipeDetailModal.css";

const RecipeBenefits = forwardRef<HTMLDivElement>(function RecipeBenefits(
  {},
  ref
) {
  return (
    <section ref={ref} className={recipeDetailSection}>
      <div>RecipeBenefits</div>
      <div>RecipeBenefits</div>
      <div>RecipeBenefits</div>
      <div>RecipeBenefits</div>
      <div>RecipeBenefits</div>
      <div>RecipeBenefits</div>
      <div>RecipeBenefits</div>
      <div>RecipeBenefits</div>
      <div>RecipeBenefits</div>
      <div>RecipeBenefits</div>
      <div>RecipeBenefits</div>
      <div>RecipeBenefits</div>
      <div>RecipeBenefits</div>
      <div>RecipeBenefits</div>
      <div>RecipeBenefits</div>
      <div>RecipeBenefits</div>
      <div>RecipeBenefits</div>
    </section>
  );
});

RecipeBenefits.displayName = "RecipeBenefits";

export default RecipeBenefits;
