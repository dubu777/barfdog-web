import { subscriptionPlanInfo } from "@/constants";
import { pointColor } from "@/styles/common.css";
import SubscriptionCard from "../../../common/card/SubscriptionCard";
import InfoWrapper from "../../../../common/wrapper/InfoWrapper";
import { PlanKey } from "@/types";
import { SubscriptionStatus as SubscriptionStatusType } from "@/types/mypage/subscription";

interface BasicInfoProps {
  plan: PlanKey;
  dogName: string;
  recipeNames: string;
  status: SubscriptionStatusType;
  pictureUrl: string | null;
}

export default function BasicInfo({ 
  plan,
  dogName,
  recipeNames,
  status,
  pictureUrl,
}: BasicInfoProps) {
  return (
    <InfoWrapper
      paddingTop
      gap={20}
      title={(
        <>
          <span className={pointColor}>{subscriptionPlanInfo[plan]?.weeklyPaymentCycle}주</span>마다<br/>
          정기 구독 상품을 받고 있어요
        </>
      )}
    >
      <SubscriptionCard 
        status={status}
        pictureUrl={pictureUrl}
        recipeNames={recipeNames}
        dogName={dogName}
        plan={plan}
        showActions={false}
        shadow="strong"
      />
    </InfoWrapper>
  );
}