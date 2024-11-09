import { subscribeText } from "../../recipeSelection/RecipeSelection.css";
import * as styles from "./PlanselectBox.css";
import FullPlan from "/public/images/survey/full_plan.svg";
import FullPlanActive from "/public/images/survey/full_plan_active.svg";
import HalfPlan from "/public/images/survey/half_plan.svg";
import HalfPlanActive from "/public/images/survey/half_plan_active.svg";

export default function PlanSelectBox() {
  return (
    <div className={styles.planBoxContainer({isSelected: false})}>
    {/* <div className={styles.planBoxWrapper}> */}
      <div className={styles.planTitleWrapper}>
        <span className={subscribeText({type: 'recipeTitle'})}>풀플랜</span>
        <FullPlan />
      </div>
      <div className={styles.planBoxDivider({isSelected: false})}/>
      <div className={styles.planContentWrapper}>
      <span className={subscribeText({type: 'recipeTitle'})}>하루 2팩 / 2주 간격 배송 / 총 28팩</span>
      </div>
      {/* </div> */}
    </div>
  );
}
