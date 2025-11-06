import { commonWrapper } from "@/styles/common.css";
import Text from "@/components/ui/text/Text";
import CardImage from "../../../common/card/image/CardImage";
import SubscriptionPlan from "./SubscriptionPlan";
import SubscriptionStatus from "./SubscriptionStatus";
import { CurrentPlanInfo } from "@/types";
import { SubscriptionStatus as SubscriptionStatusType } from "@/types/mypage/subscription";

interface SubscriptionContentsProps {
  status: SubscriptionStatusType;
  pictureUrl?: string | null;
  recipeNames: string;
  dogName: string;
  planInfo: CurrentPlanInfo;
}
export default function SubscriptionContents({
  status,
  pictureUrl,
  recipeNames,
  dogName,
  planInfo,
}: SubscriptionContentsProps) {
  return (
    <>
      <SubscriptionStatus status={status} />
      <div className={commonWrapper({ gap: 12, align: 'start' })}>
        {pictureUrl !== undefined && 
          <CardImage imageUrl={pictureUrl} name={recipeNames} />
        }
        <div className={commonWrapper({ direction: 'col', gap: 4, align: 'start' })}>
          <Text type='headline2'>{dogName}</Text>
          <SubscriptionPlan 
            planInfo={planInfo}
            recipeNames={recipeNames} 
          />
        </div>
      </div>
    </>
  );
}