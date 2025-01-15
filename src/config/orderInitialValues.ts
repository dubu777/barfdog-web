import {
  CreateGeneralOrderRequest,
  CreateSubscriptionOrderRequest,
  DeliveryDto,
} from "@/types";

const initialGeneralOrderBody: CreateGeneralOrderRequest = {
  orderItemDtoList: [],
  deliveryDto: {
    name: "",
    phone: "",
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
  paymentPrice: 0,
  paymentMethod: "NAVER_PAY",
  agreePrivacy: false,
  brochure: false,
};

const initialSubscriptionOrderBody: CreateSubscriptionOrderRequest = {
  customerUid: "",
  memberCouponId: null,
  deliveryDto: {
    name: "",
    phone: "",
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
  agreePrivacy: false,
  brochure: false,
};


const initialDeliveryDto: DeliveryDto = {
  name: null,
  phone: null,
  zipcode: null,
  street: null,
  detailAddress: null,
  request: null,
};


export { initialDeliveryDto, initialGeneralOrderBody, initialSubscriptionOrderBody }