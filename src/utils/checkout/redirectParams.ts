export type GeneralRedirectParams = {
  impUid: string;
  impSuccess: boolean;
  merchantUid: string;
  orderId: number;
  discountReward: number;
  memberCouponId: number;
  errorMsg?: string;
};

export function parseGeneralParams(
  sp: URLSearchParams
): GeneralRedirectParams | null {
  const imp_uid = sp.get("imp_uid");
  const imp_success = sp.get("imp_success");
  const merchantUid = sp.get("merchantUid");
  const orderIdStr = sp.get("order_id");
  const discountRewardStr = sp.get("discount_reward");
  const memberCouponIdStr = sp.get("member_coupon_id");
  const errorMsg = sp.get("error_msg") ?? undefined;

  if (
    !imp_uid ||
    !imp_success ||
    !merchantUid ||
    !orderIdStr ||
    !discountRewardStr ||
    !memberCouponIdStr
  ) {
    return null;
  }

  const orderId = Number(orderIdStr);
  const discountReward = Number(discountRewardStr);
  const memberCouponId = Number(memberCouponIdStr);

  if (
    Number.isNaN(orderId) ||
    Number.isNaN(discountReward) ||
    Number.isNaN(memberCouponId)
  ) {
    return null;
  }

  return {
    impUid: imp_uid,
    impSuccess: imp_success === "true",
    merchantUid,
    orderId,
    discountReward,
    memberCouponId,
    errorMsg,
  };
}

export type SubscriptionRedirectParams = {
  impUid: string;
  impSuccess: boolean;
  merchantUid: string;
  orderId: number;
  customerUid: string;
  amount: number;
  discountReward: number;

  name: string;
  buyer_name: string;
  buyer_tel: string;
  buyer_email: string;
  buyer_addr: string;
  buyer_postcode: string;

  errorMsg?: string;
  subscribeId?: string;
};

export function parseSubscriptionParams(
  sp: URLSearchParams
): SubscriptionRedirectParams | null {
  const imp_uid = sp.get("imp_uid");
  const imp_success = sp.get("imp_success");
  const merchantUid = sp.get("merchantUid");
  const orderIdStr = sp.get("order_id");
  const customerUid = sp.get("customer_uid");
  const amountStr = sp.get("amount");
  const discountRewardStr = sp.get("discount_reward");

  const name = sp.get("name") ?? "";
  const buyer_name = sp.get("buyer_name") ?? "";
  const buyer_tel = sp.get("buyer_tel") ?? "";
  const buyer_email = sp.get("buyer_email") ?? "";
  const buyer_addr = sp.get("buyer_addr") ?? "";
  const buyer_postcode = sp.get("buyer_postcode") ?? "";

  const errorMsg = sp.get("error_msg") ?? undefined;
  const subscribeId = sp.get("subscription_Id") ?? undefined;

  if (
    !imp_uid ||
    !imp_success ||
    !merchantUid ||
    !orderIdStr ||
    !customerUid ||
    !amountStr ||
    !discountRewardStr
  ) {
    return null;
  }

  const orderId = Number(orderIdStr);
  const amount = Number(amountStr);
  const discountReward = Number(discountRewardStr);

  if (
    Number.isNaN(orderId) ||
    Number.isNaN(amount) ||
    Number.isNaN(discountReward)
  )
    return null;

  return {
    impUid: imp_uid,
    impSuccess: imp_success === "true",
    merchantUid,
    orderId,
    customerUid,
    amount,
    discountReward,
    name,
    buyer_name,
    buyer_tel,
    buyer_email,
    buyer_addr,
    buyer_postcode,
    errorMsg,
    subscribeId,
  };
}
