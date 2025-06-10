"use client";

import DefaultText from "@/components/common/defaultText/DefaultText";
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
      <DefaultText type="display1">결제 완료</DefaultText>
    </div>
  );
}
