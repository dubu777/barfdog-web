import InfoSection from "@/components/pages/mypage/common/information/layout/InfoSection";
import { PAYMENT_LABEL } from "@/constants";
import { InfoListsItem, PlanKey } from "@/types";
import { calculateOriginPrice } from "@/utils/checkout/calculateOriginPrice";

interface SubscriptionRefundInfoProps {
  data: any;
}

const SubscriptionRefundInfo = ({ data }: SubscriptionRefundInfoProps) => {
  const paymentPrice = `${data?.paymentPrice?.toLocaleString()}원`;
  // const orderPrice = `${data?.orderPrice?.toLocaleString()}원`;
  const discountCoupon = `-${data?.discountCoupon?.toLocaleString()}원`;
  const discountReward = `-${data?.discountReward?.toLocaleString()}원`;
  const discountGrade = `-${data?.discountGrade?.toLocaleString()}원`;
  const originPrice = calculateOriginPrice(
    data?.orderPrice,
    data?.plan as PlanKey
  );
  const salePrice = `-${(originPrice - data?.orderPrice).toLocaleString()}원`;

  const paymentInfo = [
    { label: "결제수단", value: PAYMENT_LABEL[data?.paymentMethod] },
    { label: "총 금액", value: `${originPrice.toLocaleString()}원` },
    data?.salePrice !== 0
      ? { label: "할인 혜택", value: salePrice }
      : undefined,
    { label: "배송비", value: "무료" },
    { label: "등급 할인", value: discountGrade },
    data?.discountCoupon !== 0
      ? { label: "쿠폰 사용", value: discountCoupon }
      : undefined,
    data?.discountReward !== 0
      ? { label: "적립금 사용", value: discountReward }
      : undefined,
  ].filter(Boolean) as InfoListsItem[];

  const infoLists = [{ items: paymentInfo, noBorder: true }];
  return (
    <InfoSection
      title="환불 예정 금액"
      subTitle="주문금액"
      subTitleRight={paymentPrice}
      infoLists={infoLists}
      isDefaultOpen
    />
  );
};

export default SubscriptionRefundInfo;
