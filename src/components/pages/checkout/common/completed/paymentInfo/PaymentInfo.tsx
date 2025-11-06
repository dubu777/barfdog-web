import Card from "@/components/ui/card/Card";
import Text from "@/components/ui/text/Text";
import { orderSummaryRowContainer } from "../../orderSummary/orderSummaryRow/OrderSummaryRow.css";
import { PaymentMethod } from "@/types";
import Divider from "@/components/ui/divider/Divider";
import { PAYMENT_LABEL } from "@/constants";

interface PaymentInfoProps {
  paymentPrice: number;
  paymentMethod: PaymentMethod;
}

export default function PaymentInfo({
  paymentPrice,
  paymentMethod,
}: PaymentInfoProps) {
  return (
    <Card shadow="light" padding={12} gap={12}>
      <div className={orderSummaryRowContainer}>
        <Text type="headline2" color="gray900">
          결제 금액
        </Text>
        <Text type="label4" color="red">
          {paymentPrice}
        </Text>
      </div>
      <Divider thickness={2} color="gray900" />
      <div className={orderSummaryRowContainer}>
        <Text type="label4" color="gray900">
          결제 금액
        </Text>
        <Text type="body3" color="gray900">
          {PAYMENT_LABEL[paymentMethod]}
        </Text>
      </div>
    </Card>
  );
}
