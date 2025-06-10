import DefaultText from "@/components/common/defaultText/DefaultText";
import Divider from "@/components/common/divider/Divider";
import InfoBox from "@/components/common/infoBox/InfoBox";
import OrderSummaryRow from "@/components/pages/checkout/common/orderSummary/orderSummaryRow/OrderSummaryRow";
import { commonWrapper } from "@/styles/common.css";

interface SubscriptionSummaryProps {
  finalPrice: number;
  originPrice: number;
  discountAmount: number;
  deliveryCycle: number;
}

export default function SubscriptionSummary({
  finalPrice,
  originPrice,
  discountAmount,
  deliveryCycle,
}: SubscriptionSummaryProps) {
  return (
    <div
      className={commonWrapper({
        direction: "col",
        justify: "start",
        align: "start",
        gap: 16,
        padding: 32,
      })}
    >
      <DefaultText type="title4">
        <DefaultText type="title4" color="red">
          {deliveryCycle}주
        </DefaultText>
        마다 <br />
        정기 결제가 진행돼요
      </DefaultText>
      <div
        className={commonWrapper({
          direction: "col",
          gap: 8,
        })}
      >
        <OrderSummaryRow
          label="총 금액"
          value={originPrice}
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
        value={finalPrice}
        labelType="headline2"
        labelColor="gray900"
        valueType="title2"
        plus
      />
      <InfoBox text="쿠폰•적립금은 결제 화면에서 사용할 수 있어요!" fullWidth />
    </div>
  );
}
