import MetaText from "../../../common/card/typography/MetaText";
import { PlanKey } from "@/types";
import { subscriptionPlanInfo } from "@/constants";

interface SubscriptionPlanProps {
  plan: PlanKey;
  recipeNames: string;
}

export default function SubscriptionPlan({ plan, recipeNames }: SubscriptionPlanProps) {
  return (
    <div>
      <MetaText 
        textList={[
          subscriptionPlanInfo[plan].label,
          `총 ${subscriptionPlanInfo[plan].totalNumberOfPacks}회`,
          `${subscriptionPlanInfo[plan].weeklyPaymentCycle}주 정기결제`
        ]}
      />
      <MetaText
        textList={[recipeNames]}
      />
    </div>
  );
}