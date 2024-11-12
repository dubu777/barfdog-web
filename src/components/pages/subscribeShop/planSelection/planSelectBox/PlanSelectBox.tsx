import { subscribeText } from "../../recipeSelection/RecipeSelection.css";
import * as styles from "./PlanselectBox.css";
import FullPlan from "/public/images/survey/full_plan.svg";
import FullPlanActive from "/public/images/survey/full_plan_active.svg";
import HalfPlan from "/public/images/survey/half_plan.svg";
import HalfPlanActive from "/public/images/survey/half_plan_active.svg";

interface PlanSelectBoxProps {
  title: string;
  content: string[];
}


export default function PlanSelectBox({title, content}: PlanSelectBoxProps) {
  return (
    <div className={styles.planBoxContainer({isSelected: false})}>
    {/* <div className={styles.planBoxWrapper}> */}
      <div className={styles.planTitleWrapper}>
        <span className={subscribeText({type: 'recipeTitle'})}>{title}</span>
        <FullPlan />
      </div>
      <div className={styles.planBoxDivider({isSelected: false})}/>
      <div className={styles.planContentWrapper}>
        {content.map((word) => (
          <span className={subscribeText({type: 'recipeTitle'})}>{word}</span>
        ))}
      </div>
      {/* </div> */}
    </div>
  );
}
