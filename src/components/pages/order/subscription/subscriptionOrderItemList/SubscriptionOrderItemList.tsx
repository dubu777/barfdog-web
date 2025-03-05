import { SubscriptionOrderSheetResponse } from "@/types";
import OrderSection from "../../common/orderSection/OrderSection";
import OrderItemCard from "./orderItemCard/OrderItemCard";
import { ORDER_TYPE } from "@/constants";

interface SubscriptionOrderItemListProps {
  subscriptionOrderSheetData: SubscriptionOrderSheetResponse;
}

export default function SubscriptionOrderItemList({ subscriptionOrderSheetData }: SubscriptionOrderItemListProps) {
  return (
    <OrderSection title="구독 상품" style={{ gap: "20px" }}>
      {/* <OrderItemCard orderType={ORDER_TYPE.SUBSCRIPTION} /> */}
      {
        subscriptionOrderSheetData.recipeNameList.map((recipeName, index) => (
          <OrderItemCard orderType={ORDER_TYPE.SUBSCRIPTION} orderData={subscriptionOrderSheetData.subscribeDto} recipeName={recipeName}/>
        ))
      }
      {/* <OrderItemCard orderType={ORDER_TYPE.SUBSCRIPTION} orderData={subscriptionOrderSheetData.subscribeDto}/> */}
    </OrderSection>
  )
}