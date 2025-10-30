import Text from "@/components/ui/text/Text";
import Divider from "@/components/ui/divider/Divider";
import InfoBox from "@/components/ui/infoBox/InfoBox";
import OrderSummaryRow from "@/components/pages/checkout/common/orderSummary/orderSummaryRow/OrderSummaryRow";
import { DELIVERY_PLAN_LABEL } from "@/constants";
import { commonWrapper } from "@/styles/common.css";
import { DeliveryPlan } from "@/types";

interface SubscriptionSummaryProps {
  paymentExpectedPrice: number;
  totalOriginalPrice: number;
  discountAmount: number;
  deliveryPlan: DeliveryPlan;
}

export default function SubscriptionSummary({
  paymentExpectedPrice,
  totalOriginalPrice,
  discountAmount,
  deliveryPlan,
}: SubscriptionSummaryProps) {
  return (
    <div
      className={commonWrapper({
        direction: "col",
        justify: "start",
        align: "start",
        gap: 16,
        padding: '32/20',
      })}
    >
      <Text type="title4">
        <Text type="title4" color="red">
          {DELIVERY_PLAN_LABEL[deliveryPlan]}
        </Text>
        마다 <br />
        정기 결제가 진행돼요
      </Text>
      <div
        className={commonWrapper({
          direction: "col",
          gap: 8,
        })}
      >
        <OrderSummaryRow
          label="총 금액"
          value={totalOriginalPrice}
          valueType="headline2"
          plainColor
          plus
        />
        <OrderSummaryRow
          label="할인 혜택"
          value={discountAmount}
          valueType="body2"
        />
      </div>
      <Divider thickness={1} color="gray200" />
      <OrderSummaryRow
        label="결제 예정 금액"
        value={paymentExpectedPrice}
        labelType="headline2"
        labelColor="gray900"
        valueType="title2"
        plus
      />
      <InfoBox text="쿠폰•적립금은 결제 화면에서 사용할 수 있어요!" fullWidth />
    </div>
  );
}
