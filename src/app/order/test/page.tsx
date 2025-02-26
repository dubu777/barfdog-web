"use client";

import Button from "@/components/common/button/Button";
import TestTokenRefresh from "@/components/test/auth/TestRefreshToken";
import { usePersistOrderStore } from "@/store/order/usePersistOrderStore";
import { useRouter } from "next/navigation";
import * as styles from "./Test.css";


export default function GeneralShopTest() {
  const router = useRouter();
  const { setOrderItemDtoList, clearOrderItemDtoList } =
    usePersistOrderStore();
    
  const orderItemListData = [
    {
      itemDto: {
        itemId: 10,
        amount: 2,
      },
      itemOptionDtoList: [
      ],
    },
  ];

  const generalPaymentTest = () => {
    console.log("일반상점테스트");
    setOrderItemDtoList(orderItemListData);
    router.push('/order/order-sheet/general');
  };
  return (
    <div className={styles.testContainer}>
      <Button onClick={generalPaymentTest}>일반 상품 구매 테스트 버튼</Button>
      <TestTokenRefresh />
    </div>
  );
}
