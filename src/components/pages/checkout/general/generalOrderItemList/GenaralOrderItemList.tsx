import React, { useEffect, useMemo } from "react";
import Divider from "@/components/common/divider/Divider";
import OrderSection from "../../common/orderSection/OrderSection";

import { GeneralOrderItem } from "@/types";
import * as styles from "../../subscription/subscriptionOrderItemList/SubscriptionOrderItemList.css";
import GeneralOrderItemCard from "./generalOrderItemCard/GeneralOrderItemCard";
import { usePaymentStore } from "@/store/checkout/usePaymentStore";

interface GeneralOrderItemListProps {
  orderItemDtoList: GeneralOrderItem[];
}

export default function GeneralOrderItemList({
  orderItemDtoList,
}: GeneralOrderItemListProps) {
  const setFinalPrice = usePaymentStore((state) => state.setFinalPrice);

  const finalPrice = useMemo(() => {
    return orderItemDtoList.reduce(
      (sum, item) => sum + item.discountedItemAndOptionPrice,
      0
    );
  }, [orderItemDtoList]);

  useEffect(() => {
    setFinalPrice(finalPrice);
  }, [finalPrice, setFinalPrice]);

  return (
    <OrderSection title="주문 상품" style={{ gap: "20px" }}>
      <div className={styles.orderItemListContainer}>
        {orderItemDtoList.map((item, index, array) => (
          <React.Fragment key={item.itemId}>
            <GeneralOrderItemCard orderItemData={item} />
            {index < array.length - 1 && <Divider thickness={1} />}
          </React.Fragment>
        ))}
      </div>
    </OrderSection>
  );
}
