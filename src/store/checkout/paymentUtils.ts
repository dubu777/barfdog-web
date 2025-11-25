import { PAYMENT_METHOD, PG_CHANNEL_KEY } from "@/constants";
import {
  GeneralIamportRequest,
  GeneralPaymentDataParams,
  SubscriptionIamportRequest,
  SubscriptionPaymentDataParams,
} from "@/types";
import { getPaymentDisplayAmount } from "@/utils/checkout/getPaymentDisplayAmount";
import {
  getNaverPayGeneralPaymentParam,
  getNaverPaySubscriptionPaymentParam,
} from "@/utils/checkout/naverPayParams";

/**
 * 일반 결제 데이터 생성
 */
export function buildGeneralPaymentRequest({
  requestBody,
  orderId,
  merchantUid,
  generalOrderSheetData,
  isMobileDevice,
}: GeneralPaymentDataParams): GeneralIamportRequest {
  const { paymentMethod, paymentPrice, deliveryDto } = requestBody;
  const { orderItemDtoList, email } = generalOrderSheetData;

  const itemList = orderItemDtoList;
  const itemName = itemList.map((item) => item.name).join(", ");

  const baseData = {
    channelKey: PG_CHANNEL_KEY.GENERAL[paymentMethod],
    pay_method: PAYMENT_METHOD[paymentMethod],
    merchant_uid: merchantUid,
    amount: paymentPrice,
    name: itemName,
    buyer_email: email,
    buyer_name: deliveryDto.recipientName,
    buyer_tel: deliveryDto.phoneNumber ?? "",
    buyer_addr: `${deliveryDto.street}, ${deliveryDto.detailAddress}`,
    buyer_postcode: deliveryDto.zipcode ?? "",
    m_redirect_url:
      `${window.location.origin}/checkout/mobile-payment-redirect/general?` +
      `order_id=${encodeURIComponent(orderId)}&` +
      `merchantUid=${encodeURIComponent(merchantUid)}&` +
      `discount_reward=${encodeURIComponent(requestBody.discountReward)}&` +
      `member_coupon_id=${encodeURIComponent(
        requestBody.memberCouponId ?? ""
      )}&`,
  };

  if (paymentMethod === "NAVER_PAY") {
    const naverPayData = getNaverPayGeneralPaymentParam({
      items: orderItemDtoList,
      isMobile: isMobileDevice,
    });

    if (!naverPayData) throw new Error("네이버페이 결제 데이터 생성 실패");

    return { ...baseData, ...naverPayData };
  }

  return baseData;
}

/**
 * 구독 결제 데이터 생성
 */
export function buildSubscriptionPaymentRequest({
  requestBody,
  orderId,
  subscribeId,
  subscriptionOrderSheetData,
  isMobileDevice,
  merchantUid,
  from = "web",
}: SubscriptionPaymentDataParams): SubscriptionIamportRequest {
  const { paymentInfo, deliveryInfo } = requestBody;
  const { subscribeInfo } = subscriptionOrderSheetData;

  const itemName = subscribeInfo.recipeList.map((recipe) => recipe.name).join(", ");
  // email은 새로운 API 스펙에 없으므로 빈 문자열 사용 (필요시 추가 확인 필요)
  const email = ""; // TODO: API 스펙 확인 후 수정

  const baseData = {
    channelKey: PG_CHANNEL_KEY.SUBSCRIPTION[paymentInfo.paymentMethod],
    pay_method: PAYMENT_METHOD["CREDIT_CARD"],
    merchant_uid: null,
    customer_uid: paymentInfo.customerUid,
    amount: getPaymentDisplayAmount({
      paymentMethod: paymentInfo.paymentMethod,
      originAmount: paymentInfo.paymentPrice,
    }),
    name: itemName,
    buyer_email: email,
    buyer_name: deliveryInfo.address.recipientName,
    buyer_tel: deliveryInfo.address.phoneNumber,
    buyer_addr: `${deliveryInfo.address.street}, ${deliveryInfo.address.detailAddress}`,
    buyer_postcode: deliveryInfo.address.zipcode,
    m_redirect_url:
      `${window.location.origin}/checkout/mobile-payment-redirect/subscription?` +
      `order_id=${encodeURIComponent(orderId)}&` +
      `customer_uid=${encodeURIComponent(paymentInfo.customerUid)}&` +
      `merchantUid=${encodeURIComponent(merchantUid)}&` +
      `amount=${encodeURIComponent(paymentInfo.paymentPrice)}&` +
      `name=${encodeURIComponent(itemName)}&` +
      `buyer_name=${encodeURIComponent(deliveryInfo.address.recipientName)}&` +
      `buyer_tel=${encodeURIComponent(deliveryInfo.address.phoneNumber)}&` +
      `buyer_email=${encodeURIComponent(email)}&` +
      `subscription_Id=${encodeURIComponent(subscribeId)}&` +
      `buyer_addr=${encodeURIComponent(
        `${deliveryInfo.address.street}, ${deliveryInfo.address.detailAddress}`
      )}&` +
      `buyer_postcode=${encodeURIComponent(deliveryInfo.address.zipcode)}&` +
      `from=${encodeURIComponent(from)}`,
  };
  if (paymentInfo.paymentMethod === "NAVER_PAY") {
    const naverPayData = getNaverPaySubscriptionPaymentParam({
      subscribeId: subscribeInfo.id,
      isMobile: isMobileDevice,
    });

    if (!naverPayData) throw new Error("네이버페이 구독 데이터 생성 실패");

    return { ...baseData, ...naverPayData };
  }

  return baseData;
}
