"use client";

import DeliveryInfo from "../../common/completed/deliveryInfo/DeliveryInfo";
import PaymentInfo from "../../common/completed/paymentInfo/PaymentInfo";
import { completedContainer } from "../../OrderSheetCommon.css";
import Text from "@/components/ui/text/Text";
import { commonWrapper, pointColor } from "@/styles/common.css";
import ButtonDocked from "@/components/ui/buttonDocked/ButtonDocked";
import { useRouter } from "next/navigation";
import { usePersistOrderStore } from "@/store/checkout/usePersistOrderStore";
import { useGetGeneralCheckout } from "@/api/checkout/queries/useGetGeneralCheckout";
import Spinner from "@/components/ui/spinner/Spinner";
import GeneralItemInfo from "../../common/completed/generalItemInfo.tsx/GeneralItemInfo";
import Button from "@/components/ui/button/Button";
import Link from "next/link";
import { useEffect } from "react";

interface GeneralOrderCompletedProps {
  orderId: number;
}

export default function GeneralOrderCompleted({
  orderId,
}: GeneralOrderCompletedProps) {
  const { clearItemList } = usePersistOrderStore();

  useEffect(() => {
    clearItemList();
  }, [clearItemList]);

  return (
    <div className={completedContainer}>
      <div className={commonWrapper({ direction: "col", gap: 8 })}>
        <Text type="title1">일반 결제 완료 페이지, orderId: {orderId}</Text>
        <Link href={"/"}>
          <Button>메인 페이지</Button>
        </Link>
        <Link href={"/order/test"}>
          <Button>Order test</Button>
        </Link>
      </div>
      {/* <div className={commonWrapper({ direction: "col", gap: 12 })}>
        <Text type="title2">
          <span className={pointColor}>주문이 완료</span>되었어요
        </Text>
        <Text type="body3" color="gray600">
          주문번호 123123123
        </Text>
      </div>
      <DeliveryInfo deliveryDto={deliveryDto} />
      <PaymentInfo paymentPrice={13000} paymentMethod="NAVER_PAY" />
      <GeneralItemInfo itemList={generalOrderData.itemList} />
      <ButtonDocked
        type="dual-button"
        primaryButtonLabel="구독 상세보기"
        secondaryButtonLabel="홈으로"
        onPrimaryClick={handleGoToDetail}
        onSecondaryClick={handleGoToHome}
      /> */}
    </div>
  );
}
