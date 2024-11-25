
interface OrderItem {
  id: number;
  name: string;
}

interface RecipeDto {
  thumbnailUrl: string;
  recipeName: string;
}

interface OrderDto {
  id: number;
  merchantUid: string;
  orderDate: string | Date;
  orderStatus: string;
  paymentPrice: number;
}

interface SubscribeOrderDto extends OrderDto {
  orderId: number;
  subscribeId: number;
  dogName: string;
  subscribeCount: number;
  paymentMethod: string;
  customerUid: string | null;
  paid: boolean;
}

export interface SubscribeOrderData {
  recipeDto: RecipeDto;
  subscribeOrderDto: SubscribeOrderDto;
}

export interface GeneralOrderData {
  itemNameList: OrderItem[];
  orderDto: OrderDto;
  thumbnailUrl: string;
}

export interface SubscribeOrderData {
  recipeDto: RecipeDto;
  subscribeOrderDto: SubscribeOrderDto;
}


export interface OrderDetailDto extends OrderCancel {
  orderId?: number;
  merchantUid?: string;
  paymentDate?: string;
  deliveryNumber?: null | number | string;
  deliveryCode?: null | number | string;
  transUniqueCd?: null | number | string;
  arrivalDate?: null | number | string;
  orderPrice?: number;
  deliveryPrice?: number;
  discountGrade?: number;
  discountTotal?: number;
  discountReward?: number;
  discountCoupon?: number;
  overDiscount?: number;
  paymentPrice?: number;
  paymentMethod?: string;
  name?: string;
  phone?: string;
  zipcode?: string;
  street?: string;
  detailAddress?: string;
  request?: null | number | string;
  orderStatus?: string;
  package?: boolean;
}

interface OrderCancel {
  cancelReason: string;
  cancelDetailReason: string;
  cancelRequestDate: string;
  cancelConfirmDate: string;
}

interface SelectOptionDtoList {
  itemOptionId: number;
  amount: number;
}

export interface OrderItemDtoList {
  orderItemId: number;
  thumbnailUrl: string;
  selectOptionDtoList: SelectOptionDtoList[];
  itemId: number;
  itemName: string;
  amount: number;
  finalPrice: number;
  discountAmount: number;
  status: string;
  saveReward: number;
  category: string;
  orderCancel: OrderCancel;
  orderReturn?: null;
  orderExchange?: null;
}
