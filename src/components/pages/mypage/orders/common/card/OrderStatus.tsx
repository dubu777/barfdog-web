import { commonWrapper } from "@/styles/common.css";
import Text from "@/components/common/text/Text";
import { PlanKey } from "@/types";
import { OrderType } from "@/types/mypage/orders";
import { subscriptionPlanInfo } from "@/constants";
import { ORDER_STATUS, ORDER_TYPE_LABEL } from "@/constants/mypage/orders";
import VerticalDivider from "../../../common/card/verticalDivider/VerticalDivider";

interface OrderStatusProps {
  orderStatus: string;
  plan?: PlanKey;
  orderType?: OrderType;
}

export default function OrderStatus({ 
  orderStatus, 
  plan,
  orderType
}: OrderStatusProps) {
  return (
    <div className={commonWrapper({ gap: 6, justify: 'start' })}>
      <Text type="headline2">{ORDER_STATUS[orderStatus]}</Text>
      {plan && (
        <>
          <VerticalDivider />
          <Text type="caption" color="gray600">{subscriptionPlanInfo[plan as PlanKey]?.label}</Text>
        </>
      )}
      {orderType && (
        <>
          <VerticalDivider />
          <Text type="caption" color="gray600">{ORDER_TYPE_LABEL[orderType]}</Text>
        </>
      )}
    </div>
  );
}