import { PAYMENT_METHOD, PG_CHANNEL_KEY } from "@/constants";
import {
  GeneralIamportRequest,
  GeneralPaymentDataParams,
  SubscriptionIamportRequest,
  SubscriptionPaymentDataParams,
} from "@/types";
import { getPaymentDisplayAmount } from "@/utils/order/getPaymentDisplayAmount";
import {
  getNaverPayGeneralPaymentParam,
  getNaverPaySubscriptionPaymentParam,
} from "@/utils/order/naverPayParams";

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
      `${window.location.origin}/order/checkout/mobile-payment-redirect/general?` +
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
}: SubscriptionPaymentDataParams): SubscriptionIamportRequest {
  const { paymentMethod, paymentPrice, deliveryDto, customerUid } = requestBody;
  const { email, subscribeDto, recipeNameList } = subscriptionOrderSheetData;

  const itemName = recipeNameList.join(", ");
  const baseData = {
    channelKey: PG_CHANNEL_KEY.SUBSCRIPTION[paymentMethod],
    pay_method: PAYMENT_METHOD["CREDIT_CARD"],
    merchant_uid: null,
    customer_uid: customerUid,
    amount: getPaymentDisplayAmount({
      paymentMethod: paymentMethod,
      originAmount: paymentPrice,
    }),
    name: itemName,
    buyer_email: email,
    buyer_name: deliveryDto.recipientName,
    buyer_tel: deliveryDto.phoneNumber,
    buyer_addr: `${deliveryDto.street}, ${deliveryDto.detailAddress}`,
    buyer_postcode: deliveryDto.zipcode,
    m_redirect_url:
      `${window.location.origin}/order/checkout/mobile-payment-redirect/subscription?` +
      `order_id=${encodeURIComponent(orderId)}&` +
      `customer_uid=${encodeURIComponent(customerUid)}&` +
      `merchantUid=${encodeURIComponent(merchantUid)}&` +
      `amount=${encodeURIComponent(paymentPrice)}&` +
      `name=${encodeURIComponent(itemName)}&` +
      `discount_reward=${encodeURIComponent(requestBody.discountReward)}&` +
      `buyer_name=${encodeURIComponent(deliveryDto.recipientName)}&` +
      `buyer_tel=${encodeURIComponent(deliveryDto.phoneNumber)}&` +
      `buyer_email=${encodeURIComponent(email)}&` +
      `subscription_Id=${encodeURIComponent(subscribeId)}&` +
      `buyer_addr=${encodeURIComponent(
        `${deliveryDto.street}, ${deliveryDto.detailAddress}`
      )}&` +
      `buyer_postcode=${encodeURIComponent(deliveryDto.zipcode)}`,
  };
  if (paymentMethod === "NAVER_PAY") {
    const naverPayData = getNaverPaySubscriptionPaymentParam({
      subscribeId: subscribeDto.id,
      isMobile: isMobileDevice,
    });

    if (!naverPayData) throw new Error("네이버페이 구독 데이터 생성 실패");

    return { ...baseData, ...naverPayData };
  }

  return baseData;
}
