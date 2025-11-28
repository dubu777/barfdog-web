import React from "react";
import Divider from "@/components/ui/divider/Divider";
import OrderSection from "../../common/orderSection/OrderSection";

import { GeneralItem } from "@/types";
import * as styles from "../../subscription/subscriptionOrderItemList/SubscriptionOrderItemList.css";
import GeneralOrderItemCard from "./generalOrderItemCard/GeneralOrderItemCard";

interface GeneralOrderItemListProps {
  itemList: GeneralItem[];
}

export default function GeneralOrderItemList({
  itemList,
}: GeneralOrderItemListProps) {
  return (
    <OrderSection title="주문 상품" gap={20}>
      <div className={styles.orderItemListContainer}>
        {itemList.map((item, index, array) => (
          <React.Fragment key={item.id}>
            <GeneralOrderItemCard generalItem={item} />
            {index < array.length - 1 && <Divider thickness={1} />}
          </React.Fragment>
        ))}
      </div>
    </OrderSection>
  );
}
