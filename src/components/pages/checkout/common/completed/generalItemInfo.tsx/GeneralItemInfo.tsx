import React, { useEffect, useMemo } from "react";
import Divider from "@/components/ui/divider/Divider";

import { GeneralItem } from "@/types";
import { commonWrapper } from "@/styles/common.css";
import GeneralOrderItemCard from "../../../general/generalOrderItemList/generalOrderItemCard/GeneralOrderItemCard";
import Card from "@/components/ui/card/Card";
import Text from "@/components/ui/text/Text";

interface GeneralItemInfoProps {
  itemList: GeneralItem[];
}

export default function GeneralItemInfo({ itemList }: GeneralItemInfoProps) {
  return (
    <Card gap={12} padding={12} align="start">
      <Text type="headline2">주문 상품</Text>
      <Divider height={2} color="gray900" />
      <div className={commonWrapper({ direction: "col", gap: 16 })}>
        {itemList.map((item, index, array) => (
          <React.Fragment key={item.id}>
            <GeneralOrderItemCard generalItem={item} />
            {index < array.length - 1 && <Divider height={1} />}
          </React.Fragment>
        ))}
      </div>
    </Card>
  );
}
