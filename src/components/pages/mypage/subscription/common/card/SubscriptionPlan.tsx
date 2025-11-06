import MetaText from "../../../common/card/typography/MetaText";
import { CurrentPlanInfo } from "@/types";
import { PLAN_LABEL } from "@/constants";

interface SubscriptionPlanProps {
  recipeNames: string;
  planInfo: CurrentPlanInfo;
}

export default function SubscriptionPlan({ recipeNames, planInfo }: SubscriptionPlanProps) {
  return (
    <div>
      <MetaText 
        textList={[
          PLAN_LABEL[planInfo?.name],
          `총 ${planInfo?.mealCount}회`,
          `${planInfo?.weeks}주 정기결제`
        ]}
      />
      <MetaText
        textList={[recipeNames]}
      />
    </div>
  );
}