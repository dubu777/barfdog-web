import { SubscriptionOrderSheetResponse } from "@/types";
import OrderSection from "../../common/orderSection/OrderSection";

interface SubscriptionOrderItemListProps {
  subscriptionOrderSheetData?: SubscriptionOrderSheetResponse;
}

export default function SubscriptionOrderItemList({ subscriptionOrderSheetData }: SubscriptionOrderItemListProps) {
  return (
    <OrderSection title="구독 상품" subTitleParts={[{ text: "옵션 변경" }]}>
      
    </OrderSection>
  )
}