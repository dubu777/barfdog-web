"use client";

import Text from "@/components/common/text/Text";
import { usePersistOrderStore } from "@/store/order/usePersistOrderStore";
import { useEffect } from "react";

export default function OrderCompleted() {
  const clearOrderItemDtoList = usePersistOrderStore(
    (state) => state.clearOrderItemDtoList
  );

  // 결제 완료시 클리어
  useEffect(() => {
    clearOrderItemDtoList();
  }, [clearOrderItemDtoList]);
  return (
    <div>
      <Text type="display1">결제 완료</Text>
    </div>
  );
}
