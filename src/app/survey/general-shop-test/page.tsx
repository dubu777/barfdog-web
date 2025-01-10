"use client";

import { usePersistOrderStore } from "@/store/usePersistOrderStore";
import { useRouter } from "next/navigation";

export default function GeneralShopTest() {
  const router = useRouter();
  const { orderItemDtoList, setOrderItemDtoList, clearOrderItemDtoList } =
    usePersistOrderStore();
    
  const orderItemListData = [
    {
      itemDto: {
        itemId: 9,
        amount: 1,
      },
      itemOptionDtoList: [
        {
          itemOptionId: 33,
          amount: 2,
        },
        {
          itemOptionId: 34,
          amount: 2,
        },
      ],
    },
    {
      itemDto: {
        itemId: 10,
        amount: 2,
      },
      itemOptionDtoList: [
        {
          itemOptionId: 18,
          amount: 1,
        },
        {
          itemOptionId: 27,
          amount: 1,
        },
      ],
    },
  ];
  const generalPaymentTest = () => {
    console.log("일반상점테스트");
    setOrderItemDtoList(orderItemListData);
    router.push('/order/order-sheet/general');
  };
  return (
    <div>
      <h1>일반상점테스트</h1>
      <button style={{width: '100%', height: '50px', backgroundColor: 'grey'}} onClick={generalPaymentTest}>버튼</button>
    </div>
  );
}
