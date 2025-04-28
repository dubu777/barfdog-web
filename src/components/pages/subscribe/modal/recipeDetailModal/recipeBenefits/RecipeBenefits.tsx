import { commonWrapper } from "@/styles/common.css";
import { forwardRef } from "react";
import { recipeDetailSection } from "../RecipeDetailModal.css";

interface RecipeBenefitsProps {

}

const RecipeBenefits = forwardRef<HTMLDivElement, RecipeBenefitsProps>(
  function RecipeBenefits({ }, ref) {
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
  }
);

RecipeBenefits.displayName = "RecipeBenefits";

export default RecipeBenefits;