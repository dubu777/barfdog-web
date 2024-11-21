import { subscribeText } from "../../recipeSelection/RecipeSelection.css";
import * as styles from "./PlanselectBox.css";
import FullPlan from "/public/images/survey/full_plan.svg";
import FullPlanActive from "/public/images/survey/full_plan_active.svg";
import HalfPlan from "/public/images/survey/half_plan.svg";
import HalfPlanActive from "/public/images/survey/half_plan_active.svg";

interface PlanSelectBoxProps {
  title: string;
  content: string[];
  selectedPlan: string | null;
  onPlanBoxSelect: (planName: string) => void;
}


export default function PlanSelectBox({title, content, selectedPlan, onPlanBoxSelect}: PlanSelectBoxProps) {
  const isSelected = selectedPlan === title;
  
  return (
    <div className={styles.planBoxContainer({isSelected})} onClick={() => onPlanBoxSelect(title)}>
    {/* <div className={styles.planBoxWrapper}> */}
      <div className={styles.planTitleWrapper}>
        <span className={subscribeText({type: 'recipeTitle', isSelected})}>{title}</span>
        {title === '풀플랜' && (isSelected ? <FullPlanActive /> : <FullPlan />)}
        {title === '하프플랜' && (isSelected ? <HalfPlanActive /> : <HalfPlan />)}
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
