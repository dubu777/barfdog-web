import Text from "@/components/ui/text/Text";
import { commonWrapper } from "@/styles/common.css";

interface OrderPriceProps {
  paymentPrice: number;
  label?: string;
}

export default function OrderPrice({ 
  paymentPrice, 
  label = '총 구매 금액' 
}: OrderPriceProps) {
  return (
    <div className={commonWrapper({ gap: 4, justify: 'start' })}>
      <Text type="caption2" color="gray600">{label}</Text>
      <Text type="label3">{paymentPrice.toLocaleString()}원</Text>
    </div>
  );
}