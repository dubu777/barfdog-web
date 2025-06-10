import { GeneralOrderSheetResponse, SaveGeneralOrderRequest } from "@/types";

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

const initialGeneralOrderSheetResponse: GeneralOrderSheetResponse = {
  defaultAddress: {
    city: "",
    default: false,
    deliveryName: null,
    detailAddress: "",
    id: 0,
    phoneNumber: "",
    recipientName: "",
    request: "",
    street: "",
    zipcode: "",
  },
  deliveryAddress: [],
  deliveryPrice: 0,
  email: "",
  freeCondition: 0,
  nextSubscribeDeliveryDate: "",
  orderItemDtoList: [],
  orderPrice: 0,
  orderStatus: "UNSUBSCRIBE_ORDER", // 초기값으로 적당한 기본 상태를 설정
  reward: 0,
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

export {
  initialDeliveryDto,
  initialGeneralOrderBody,
  initialGeneralOrderSheetResponse,
};
