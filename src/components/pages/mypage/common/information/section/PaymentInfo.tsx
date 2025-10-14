import InfoSection from "@/components/pages/mypage/common/information/layout/InfoSection";
import { PAYMENT_LABEL } from "@/constants";
import { InfoListsButtons, InfoListsItem, PlanKey } from "@/types";
import { calculateOriginPrice } from "@/utils/checkout/calculateOriginPrice";

interface PaymentInfoProps {
  data: any;
  type: "subscription" | "orderDetail" | "orderIssue" | "changePaymentMethod";
  isDefaultOpen?: boolean;
  handleChangePaymentMethod?: () => void;
}

const PaymentInfo = ({
  data,
  type = "subscription",
  isDefaultOpen = true,
  handleChangePaymentMethod,
}: PaymentInfoProps) => {
  const subscriptionType =
    type === "subscription" ||
    type === "changePaymentMethod" ||
    data.orderType === "subscribe";

  const deliveryFee = data?.deliveryPrice;
  const paymentPrice = `${data?.paymentPrice?.toLocaleString()}원`;
  const orderPrice = `${data?.orderPrice?.toLocaleString()}원`;
  const discountCoupon = `-${data?.discountCoupon?.toLocaleString()}원`;
  const discountReward = `-${data?.discountReward?.toLocaleString()}원`;
  const discountGrade = `-${data?.discountGrade?.toLocaleString()}원`;
  const originPrice = calculateOriginPrice(
    data?.orderPrice,
    data?.plan as PlanKey
  );
  const salePrice = `-${
    subscriptionType
      ? (originPrice - data?.orderPrice).toLocaleString()
      : data?.salePrice?.toLocaleString()
  }원`;

  const paymentInfo = [
    { label: "결제수단", value: PAYMENT_LABEL[data?.paymentMethod] },
    {
      label: "총 금액",
      value: subscriptionType
        ? `${originPrice.toLocaleString()}원`
        : paymentPrice,
    },
    data?.salePrice !== 0
      ? {
          label: subscriptionType ? "할인 혜택" : "상품 할인",
          value: salePrice,
        }
      : undefined,
    {
      label: "배송비",
      value:
        deliveryFee === 0
          ? `${subscriptionType ? "정기구독" : ""} 무료`
          : "5,000원",
    },
    subscriptionType && data?.discountGrade !== 0
      ? { label: "등급 할인", value: discountGrade }
      : undefined,
    data?.discountCoupon !== 0
      ? { label: "쿠폰 사용", value: discountCoupon }
      : undefined,
    data?.discountReward !== 0
      ? { label: "적립금 사용", value: discountReward }
      : undefined,
  ].filter(Boolean) as InfoListsItem[];

  const buttons =
    type === "subscription" && data.status === "SUBSCRIBING"
      ? [
          {
            label: "결제수단변경",
            onClick: handleChangePaymentMethod,
          } as InfoListsButtons,
        ]
      : [];

  const infoLists = [{ items: paymentInfo, noBorder: true }];
  return (
    <InfoSection
      title="결제정보"
      subTitle="주문금액"
      subTitleRight={subscriptionType ? `월 ${orderPrice}` : paymentPrice}
      infoLists={infoLists}
      isDefaultOpen={isDefaultOpen}
      buttons={buttons}
    />
  );
};

export default PaymentInfo;
