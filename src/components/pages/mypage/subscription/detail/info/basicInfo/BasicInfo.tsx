import { pointColor } from "@/styles/common.css";
import Button from "@/components/ui/button/Button";
import InfoBox from "@/components/ui/infoBox/InfoBox";
import SubscriptionCard from "../../../common/card/SubscriptionCard";
import InfoWrapper from "../../../../common/wrapper/InfoWrapper";
import { PlanInfo } from "@/types";
import {
  SubscriptionStatus as SubscriptionStatusType,
  VisibleSubscribeStatus,
} from "@/types/mypage/subscription";
import { isSubscriptionPendingStatus } from "@/utils/mypage/subscription/subscriptionStatusStep";

interface BasicInfoProps {
  subscriptionId: number;
  dogName: string;
  recipeNames: string;
  status: SubscriptionStatusType;
  onRetryPayment?: () => void;
  planInfo: PlanInfo;
}

export default function BasicInfo({
  subscriptionId,
  dogName,
  recipeNames,
  status,
  onRetryPayment,
  planInfo,
}: BasicInfoProps) {
  return (
    <InfoWrapper
      paddingTop
      gap={20}
      title={
        <>
          <span className={pointColor}>{planInfo.weeks}주</span>마다
          <br />
          정기 구독 상품을 받고 있어요
        </>
      }
    >
      <SubscriptionCard
        subscriptionId={subscriptionId}
        status={status}
        recipeNames={recipeNames}
        dogName={dogName}
        planInfo={planInfo}
        showActions={false}
        shadow="strong"
      >
        {isSubscriptionPendingStatus(status as VisibleSubscribeStatus) && (
          <>
            <InfoBox
              color="red"
              text="결제 오류로 이번 회차 구독이 진행되지 않았습니다. 배송과 구독 유지를 위해 결제 수단을 확인해주세요."
            />
            <Button fullWidth size="sm" onClick={onRetryPayment}>
              결제 수단 변경/재시도
            </Button>
          </>
        )}
      </SubscriptionCard>
    </InfoWrapper>
  );
}
