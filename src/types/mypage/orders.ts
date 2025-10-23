import { DELIVERY_COMPANY_CODE, ORDER_STATUS, ORDER_TYPE, ORDER_TYPE_TO_SERVER_PARAM, VISIBLE_ORDER_STATUS } from "@/constants/mypage/orders";
import { Page } from "../common";
import { PaymentMethod } from "../checkout";
import { ITEM_FILTER_CATEGORY } from "@/constants/store";
import { PlanKey } from "../subscription";

type OrderType = keyof typeof ORDER_TYPE;
type OrderTypeServerParam = typeof ORDER_TYPE_TO_SERVER_PARAM[keyof typeof ORDER_TYPE_TO_SERVER_PARAM];

type DeliveryCompanyCode = keyof typeof DELIVERY_COMPANY_CODE;

type OrderStatus = keyof typeof ORDER_STATUS;
type VisibleOrderStatus = keyof typeof VISIBLE_ORDER_STATUS;

type ItemType = keyof typeof ITEM_FILTER_CATEGORY;

interface RawSubscriptionOrder {
  recipeDto: {
    thumbnailUrl: string;
    recipeName: string;
  };
  subscribeOrderDto: {
    orderId: number;
    merchantUid: string;
    orderDate: string;
    paymentPrice: number;
    orderStatus: string;
    subscribeId: number;
    dogName: string;
    subscribeCount: number;
    paymentMethod: PaymentMethod;
    customerUid: string;
    paid: boolean;
  };
}

interface RawGeneralOrder {
  thumbnailUrl: string;
  orderDto: {
    id: number;
    merchantUid: string;
    orderDate: string;
    paymentPrice: number;
    orderStatus: string;
  };
  itemNameList: ItemNameList[];
}

interface ItemNameList {
  id: number;
  name: string;
}

interface RawOrderList {
  subscriptionOrderList: RawSubscriptionOrder[];
	generalOrderList: RawGeneralOrder[];
	page: Page;
}

// 통합된 주문 정보 타입
interface UnifiedOrderInfo {
  // 공통
  orderId: number;
  merchantUid: string;
  orderDate: string;
  paymentPrice: number;
  orderStatus: OrderStatus;
  
  // 구독
  subscribeId?: number;
  dogName?: string;
  subscribeCount?: number;
  paymentMethod?: PaymentMethod;
  customerUid?: string;
  paid?: boolean;

  // 일반
  itemNameList?: ItemNameList[];
  thumbnailUrl?: string;
}

// 통합된 레시피/상품 정보
interface UnifiedRecipeInfo {
  thumbnailUrl: string;
  name: string; // recipeName 또는 상품명
}

// 통합된 주문 데이터
interface UnifiedOrderData {
  recipeInfo?: UnifiedRecipeInfo;
  orderInfo: UnifiedOrderInfo;
}

// 페이지네이션과 함께 주문 목록을 반환
interface UnifiedOrderListResponse {
  orders: UnifiedOrderData[];
  pagination: Page & {
    hasMoreData?: boolean; // 필터링으로 인해 더 많은 데이터가 필요한지 표시
  };
}

interface OrderCancel {
  cancelReason: string;
  cancelDetailReason: string;
  cancelRequestDate: string;
  cancelConfirmDate: string;
}

interface OrderReturn {
  returnReason: string;
  returnDetailReason: string;
  returnRequestDate: string;
  returnConfirmDate: string;
}

interface OrderExchange {
  exchangeReason: string;
  exchangeDetailReason: string;
  exchangeRequestDate: string;
  exchangeConfirmDate: string;
}

interface SelectOption {
  optionName: string;
  optionAmount: number;
}

interface OrderItem {
  orderItemId: number;
  thumbnailUrl: string;
  selectOptionList: SelectOption[];
  selectOptionDtoList?: SelectOption[];
  itemId: number;
  itemName: string;
  amount: number;
  finalPrice: number;
  discountAmount: number;
  status: OrderStatus;
  saveReward: number;
  category: Omit<ItemType, "ALL">;
  orderCancel: null | OrderCancel;
  orderReturn: null | OrderReturn;
  orderExchange: null | OrderExchange;
}

interface OrderInfo extends OrderCancel {
  // 공통
  merchantUid: string;
  deliveryNumber: null | string;
  deliveryCode: null | DeliveryCompanyCode;
  orderPrice: number;
  deliveryPrice: number;
  discountTotal: number;
  discountReward: number;
  discountCoupon: number;
  overDiscount: number;
  paymentPrice: number;
  paymentMethod: PaymentMethod;
  zipcode: string;
  street: string;
  detailAddress: string;
  request: string;
  orderStatus: OrderStatus;
  name: string;
  phone: string;
  orderId: number;

  // 일반
  paymentDate?: null;
  transUniqueCd?: null | string;
  arrivalDate?: null | string;
  package?: boolean;

  // 구독
  subscribeCount?: number;
  dogName?: string;
  oneMealGramsPerRecipe?: string;
  plan?: PlanKey;
  orderType?: OrderTypeServerParam;
  orderDate?: string;
  deliveryStatus?: OrderStatus;
  discountGrade?: number;
  discountSubscribeAlliance?: number;
  saveReward?: number;
  recipientName?: string;
  recipientPhone?: string;
}

interface RecipeInfo {
  thumbnailUrl: string;
  recipeName: string;
  recipeNames: string;
}

interface RawGeneralOrderDetail {
  orderItemDtoList: OrderItem[];
  savedRewardTotal: number;
  orderDto: OrderInfo;
}

interface RawSubscriptionOrderDetail {
  orderDto: Omit<OrderInfo, 'orderId'>;
  recipeDto: RecipeInfo;
  recipeNames: string;
}

interface OrderDetail {
  // 공통
  orderInfo: OrderInfo;

  // 일반
  orderItemInfoList?: OrderItem[],
  savedRewardTotal?: number;

  // 구독
  recipeInfo?: RecipeInfo;
}

interface CancelRequestBody {
  reason: string;
  detailReason: string;
}

interface ConfirmGeneralOrderBody {
  orderId: number;
  orderItemIdList: number[];
}

interface RequestCancelOrderProps {
  reason: string;
  detailReason: string;
  openCancelRequestSuccessModal: () => void;
  onClose: () => void;
}

export type {
  OrderType,
  OrderTypeServerParam,
  RawOrderList,
  RawSubscriptionOrder,
  RawGeneralOrder,
  UnifiedOrderData,
  UnifiedOrderInfo,
  UnifiedRecipeInfo,
  UnifiedOrderListResponse,
  OrderStatus,
  VisibleOrderStatus,
  OrderItem,
  OrderInfo,
  RecipeInfo,
  ItemNameList,
  OrderDetail,
  RawGeneralOrderDetail,
  RawSubscriptionOrderDetail,
  DeliveryCompanyCode,
  CancelRequestBody,
  ConfirmGeneralOrderBody,
  RequestCancelOrderProps,
};