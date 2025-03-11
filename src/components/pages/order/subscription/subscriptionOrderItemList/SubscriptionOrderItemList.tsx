import React from "react";
import Divider from "@/components/common/divider/Divider";
import OrderSection from "../../common/orderSection/OrderSection";
import OrderItemCard from "./orderItemCard/OrderItemCard";
import { SubscriptionOrderSheetResponse } from "@/types";
import { ORDER_TYPE } from "@/constants";
import * as styles from "./SubscriptionOrderItemList.css";

interface SubscriptionOrderItemListProps {
  subscriptionOrderSheetData: SubscriptionOrderSheetResponse;
}

export default function SubscriptionOrderItemList({
  subscriptionOrderSheetData,
}: SubscriptionOrderItemListProps) {
  return (
    <OrderSection title="구독 상품" style={{ gap: "20px" }}>
      <div className={styles.orderItemListContainer}>
        {subscriptionOrderSheetData.recipeNameList.map(
          (recipeName, index, array) => (
            <React.Fragment key={recipeName}>
              <OrderItemCard
                orderType={ORDER_TYPE.SUBSCRIPTION}
                orderData={subscriptionOrderSheetData.subscribeDto}
                recipeName={recipeName}
                recipeCount={subscriptionOrderSheetData.recipeNameList.length}
                oneMealGramPerPack={30}
                originPrice={40203}
              />
              {index < array.length - 1 && (
                <Divider thickness={1} style={{margin: "16px 0"}}/>
              )}
            </React.Fragment>
          )
        )}
      </div>
    </OrderSection>
  );
}
