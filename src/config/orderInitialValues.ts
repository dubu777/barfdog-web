import {
  SaveGeneralOrderRequest,
  SaveSubscriptionOrderRequest,
} from "@/types";

const initialGeneralOrderBody: SaveGeneralOrderRequest = {
  orderItemDtoList: [],
  deliveryDto: {
    recipientName: "",
    phoneNumber: "",
    zipcode: "",
    street: "",
    detailAddress: "",
    request: "",
  },
  deliveryId: null,
  orderPrice: 0,
  deliveryPrice: 0,
  discountTotal: 0,
  discountReward: 0,
  discountCoupon: 0,
  overDiscount: 0,
  memberCouponId: null,
  finalPrice: 0,
  paymentPrice: 0,
  paymentMethod: "NAVER_PAY",
  agreePrivacy: false,
};

const initialSubscriptionOrderBody: SaveSubscriptionOrderRequest = {
  customerUid: "",
  memberCouponId: null,
  deliveryDto: {
    recipientName: "",
    phoneNumber: "",
    zipcode: "",
    street: "",
    detailAddress: "",
    request: "",
  },
  deliveryPrice: 0,
  discountCoupon: 0,
  discountGrade: 0,
  discountReward: 0,
  discountSubscriptionMonth: 0,
  discountTotal: 0,
  nextDeliveryDate: "",
  orderPrice: 0,
  overDiscount: 0,
  paymentMethod: "NAVER_PAY",
  paymentPrice: 0,
  subscriptionMonth: null,
  agreePrivacy: true,
  brochure: false,
};


const initialDeliveryDto = {
  deliveryId: 0,
  deliveryName: "",
  default: false,
  recipientName: "",
  phoneNumber: "",
  zipcode: "",
  street: "",
  detailAddress: "",
  request: "",
};


export { initialDeliveryDto, initialGeneralOrderBody, initialSubscriptionOrderBody }