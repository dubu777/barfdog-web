import React, { useEffect, useMemo } from "react";
import Divider from "@/components/ui/divider/Divider";

import { GeneralOrderItem } from "@/types";
import { usePaymentStore } from "@/store/checkout/usePaymentStore";
import { commonWrapper } from "@/styles/common.css";
import GeneralOrderItemCard from "../../../general/generalOrderItemList/generalOrderItemCard/GeneralOrderItemCard";
import Card from "@/components/ui/card/Card";
import Text from "@/components/ui/text/Text";

interface GeneralItemInfoProps {
  orderItemDtoList: GeneralOrderItem[];
}

export default function GeneralItemInfo({
  orderItemDtoList,
}: GeneralItemInfoProps) {
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
    <Card gap={12} padding={12} align="start">
      <Text type="headline2">주문 상품</Text>
      <Divider thickness={2} color="gray900" />
      <div className={commonWrapper({ direction: "col", gap: 16 })}>
        {orderItemDtoList.map((item, index, array) => (
          <React.Fragment key={item.itemId}>
            <GeneralOrderItemCard orderItemData={item} />
            {index < array.length - 1 && <Divider thickness={1} />}
          </React.Fragment>
        ))}
      </div>
    </Card>
  );
}
