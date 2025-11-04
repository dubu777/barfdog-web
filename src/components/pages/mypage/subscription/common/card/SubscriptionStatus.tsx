import Chips from "@/components/ui/chips/Chips";
import { VISIBLE_SUBSCRIPTION_STATUS, VISIBLE_SUBSCRIPTION_STATUS_CHIPS_COLOR } from "@/constants/mypage/subscription";
import { SubscriptionStatus as SubscriptionStatusType, VisibleSubscribeStatus } from "@/types/mypage/subscription";

interface SubscriptionStatusProps {
  status: SubscriptionStatusType;
}

export default function SubscriptionStatus({ status }: SubscriptionStatusProps) {
  return (
    <Chips 
      variant="solid" 
      color={VISIBLE_SUBSCRIPTION_STATUS_CHIPS_COLOR[status as VisibleSubscribeStatus]}
      borderRadius="sm"
    >
      {VISIBLE_SUBSCRIPTION_STATUS[status]}
    </Chips>
  );
}