import PlanSelectBox from "./planSelectBox/PlanSelectBox";
import FullPlanIcon from "/public/images/survey/full_plan.svg";
import * as styles from "./PlanSelection.css";
import { PLAN_SELECT_INFO, PlanName } from "@/constants";
import {
  subscribeText,
  subscribeTextWrapper,
} from "../recipeSelection/RecipeSelection.css";
import { getNameWithObjectSuffix } from "@/utils";
import { UI_MESSAGES } from "@/constants/message";

interface PlanSelectionProps {
  selectedPlan: string | null;
  dogName: string;
  onPlanSelect: (planName: PlanName) => void;
}

export default function PlanSelection({
  dogName,
  onPlanSelect,
  selectedPlan,
}: PlanSelectionProps) {
  const planSelectionTitle = getNameWithObjectSuffix(
    dogName,
    UI_MESSAGES.PLAN_TITLE
  );
  const [prefix, planWord, suffix] = planSelectionTitle.split("플랜");

  return (
    <section className={styles.planSelectionContainer}>
      <div className={subscribeTextWrapper}>
        <h2 className={subscribeText({ type: "mainTitle", color: "gray" })}>
          {prefix}
          <span
            className={subscribeText({
              type: "mainTitle",
              color: "black",
              isBold: true,
            })}
          >
            플랜
          </span>
          {planWord}
        </h2>
        <p className={subscribeText({ type: "subtitle" })}>
          {UI_MESSAGES.PLAN_SUBTITLE}
        </p>
      </div>
      {PLAN_SELECT_INFO.map(({ key, title, content }) => (
        <PlanSelectBox
          key={key}
          planName={key}
          title={title}
          content={content}
          selectedPlan={selectedPlan}
          onPlanBoxSelect={onPlanSelect}
        />
      ))}
    </section>
  );
}
