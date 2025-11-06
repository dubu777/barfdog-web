"use client";

import DeliveryInfo from "../../common/completed/deliveryInfo/DeliveryInfo";
import PaymentInfo from "../../common/completed/paymentInfo/PaymentInfo";
import { completedContainer } from "../../OrderSheetCommon.css";
import Text from "@/components/ui/text/Text";
import { commonWrapper, pointColor } from "@/styles/common.css";
import ButtonDocked from "@/components/ui/buttonDocked/ButtonDocked";
import { useRouter } from "next/navigation";
import { usePersistOrderStore } from "@/store/checkout/usePersistOrderStore";
import { useGetGeneralCheckoutSheet } from "@/api/checkout/queries/useGetGeneralCheckoutSheet";
import Spinner from "@/components/ui/spinner/Spinner";
import GeneralItemInfo from "../../common/completed/generalItemInfo.tsx/GeneralItemInfo";

export default function GeneralOrderCompleted({}) {
  const { orderItemDtoList, clearOrderItemDtoList } = usePersistOrderStore();
  const { data: generalOrderData, isPending } = useGetGeneralCheckoutSheet({
    orderItemDtoList,
  });
  const router = useRouter();
  const deliveryDto = {
    recipientName: "Mock 데이터", // 수령자 이름
    phoneNumber: "12312341234", // 수령자 전화번호
    zipcode: "123", // 우편번호
    street: "리", // 도로명 주소
    detailAddress: "13호", // 상세 주소
    request: "하하", // 배송 요청사항
    deliveryId: 12,
    deliveryName: "집",
    default: true,
  };

  if (isPending || !generalOrderData) {
    return <Spinner fullscreen />;
  }

  const handleGoToDetail = () => {
    clearOrderItemDtoList();
  };

  const handleGoToHome = () => {
    clearOrderItemDtoList();
    router.push("/");
  };

  return (
    <div className={completedContainer}>
      <div className={commonWrapper({ direction: "col", gap: 12 })}>
        <Text type="title2">
          <span className={pointColor}>주문이 완료</span>되었어요
        </Text>
        <Text type="body3" color="gray600">
          주문번호 123123123
        </Text>
      </div>
      <DeliveryInfo deliveryDto={deliveryDto} />
      <PaymentInfo paymentPrice={13000} paymentMethod="NAVER_PAY" />
      <GeneralItemInfo orderItemDtoList={generalOrderData.orderItemDtoList} />
      <ButtonDocked
        type="dual-button"
        primaryButtonLabel="구독 상세보기"
        secondaryButtonLabel="홈으로"
        onPrimaryClick={handleGoToDetail}
        onSecondaryClick={handleGoToHome}
      />
    </div>
  );
}
