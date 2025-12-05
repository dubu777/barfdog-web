import { commonWrapper } from "@/styles/common.css";
import Text from "@/components/ui/text/Text";
import { PlanKey } from "@/types";
import { OrderType } from "@/types/mypage/orders";
import { subscriptionPlanInfo } from "@/constants";
import { ORDER_STATUS, ORDER_TYPE_LABEL } from "@/constants/mypage/orders";
import Divider from "@/components/ui/divider/Divider";

interface OrderStatusProps {
  orderStatus: string;
  plan?: PlanKey;
  orderType?: OrderType;
}

export default function OrderStatus({
  orderStatus,
  plan,
  orderType,
}: OrderStatusProps) {
  return (
    <div className={commonWrapper({ gap: 6, justify: "start" })}>
      <Text type="headline2">{ORDER_STATUS[orderStatus]}</Text>
      {plan && (
        <>
          <Divider direction="vertical" thickness={1} color="gray300" />
          <Text type="caption" color="gray600">
            {subscriptionPlanInfo[plan as PlanKey]?.label}
          </Text>
        </>
      )}
      {orderType && (
        <>
          <Divider direction="vertical" thickness={1} color="gray300" />
          <Text type="caption" color="gray600">
            {ORDER_TYPE_LABEL[orderType]}
          </Text>
        </>
      )}
    </div>
  );
}
