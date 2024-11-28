import { PlanName } from "@/types";

import * as styles from "./PlanSelectBox.css";
import FullPlan from "/public/images/survey/full_plan.svg";
import FullPlanActive from "/public/images/survey/full_plan_active.svg";
import HalfPlan from "/public/images/survey/half_plan.svg";
import HalfPlanActive from "/public/images/survey/half_plan_active.svg";
import { subscribeText } from "../../recipeSelection/RecipeSelection.css";

interface PlanSelectBoxProps {
  planName: PlanName;
  title: string;
  content: string[];
  selectedPlan: string | null;
  onPlanBoxSelect: (planName: PlanName) => void;
}


export default function PlanSelectBox({planName, title, content, selectedPlan, onPlanBoxSelect}: PlanSelectBoxProps) {
  const isSelected = selectedPlan === planName;
  
  return (
    <div className={styles.planBoxContainer({isSelected})} onClick={() => onPlanBoxSelect(planName)}>
    {/* <div className={styles.planBoxWrapper}> */}
      <div className={styles.planTitleWrapper}>
        <span className={subscribeText({type: 'recipeTitle', isSelected})}>{title}</span>
        {planName === 'FULL' && (isSelected ? <FullPlanActive /> : <FullPlan />)}
        {planName === 'HALF' && (isSelected ? <HalfPlanActive /> : <HalfPlan />)}
      </div>
      <div className={styles.planBoxDivider(({isSelected}))}/>
      <div className={styles.planContentWrapper}>
        {content.map((word, idx) => (
          <span key={`${word}-${idx}`} className={subscribeText({type: 'subtext', isBold: idx === 1, color: idx === 1 ? 'black' : 'gray', isSelected})}>{word}</span>
        ))}
      </div>
      {/* </div> */}
    </div>
  );
}
