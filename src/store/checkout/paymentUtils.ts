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
  const { paymentInfo, deliveryInfo, memberCouponId } = requestBody;
  const { itemList } = generalOrderSheetData;

  const itemName = itemList.map((item) => item.name).join(", ");

  // email은 새로운 API 스펙에 없으므로 빈 문자열 사용
  const email = "";

  const baseData = {
    channelKey: PG_CHANNEL_KEY.GENERAL[paymentInfo.paymentMethod],
    pay_method: PAYMENT_METHOD[paymentInfo.paymentMethod],
    merchant_uid: merchantUid,
    amount: paymentInfo.paymentPrice,
    name: itemName,
    buyer_email: email,
    buyer_name: deliveryInfo.address.recipientName,
    buyer_tel: deliveryInfo.address.phoneNumber ?? "",
    buyer_addr: `${deliveryInfo.address.street}, ${deliveryInfo.address.detailAddress}`,
    buyer_postcode: deliveryInfo.address.zipcode ?? "",
    m_redirect_url:
      `${window.location.origin}/checkout/mobile-redirect/general?` +
      `order_id=${encodeURIComponent(orderId)}&` +
      `merchantUid=${encodeURIComponent(merchantUid)}&` +
      `discount_reward=${encodeURIComponent(paymentInfo.discountReward)}&` +
      `member_coupon_id=${encodeURIComponent(memberCouponId ?? "")}&`,
  };

  if (paymentInfo.paymentMethod === "NAVER_PAY") {
    const naverPayData = getNaverPayGeneralPaymentParam({
      items: itemList,
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

  const itemName = subscribeInfo.recipeList
    .map((recipe) => recipe.name)
    .join(", ");
  // email은 새로운 API 스펙에 없으므로 빈 문자열 사용 (필요시 추가 확인 필요)
  const email = ""; // TODO: API 스펙 확인 후 수정

  // 앱에서 결제 시도한 경우 딥링크로 직접 리다이렉트
  const baseUrl =
    from === "app"
      ? "barfdogexpo://checkout/subscription/order"
      : `${window.location.origin}/checkout/mobile-redirect/subscription`;

  const redirectUrl =
    `${baseUrl}?` +
    `order_id=${encodeURIComponent(orderId)}&` +
    `customer_uid=${encodeURIComponent(paymentInfo.customerUid)}&` +
    `merchantUid=${encodeURIComponent(merchantUid)}&` +
    `amount=${encodeURIComponent(paymentInfo.paymentPrice)}&` +
    `name=${encodeURIComponent(itemName)}&` +
    `buyer_name=${encodeURIComponent(deliveryInfo.address.recipientName)}&` +
    `buyer_tel=${encodeURIComponent(deliveryInfo.address.phoneNumber)}&` +
    `buyer_email=${encodeURIComponent(email)}&` +
    `subscription_Id=${encodeURIComponent(subscribeId)}&` +
    `payment_method=${encodeURIComponent(paymentInfo.paymentMethod)}&` +
    `buyer_addr=${encodeURIComponent(
      `${deliveryInfo.address.street}, ${deliveryInfo.address.detailAddress}`
    )}&` +
    `buyer_postcode=${encodeURIComponent(deliveryInfo.address.zipcode)}`;

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
    m_redirect_url: redirectUrl,
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
