export interface MyPageMemberDto {
  id: number;
  grade: string;
  memberName: string;
  myRecommendationCode: string;
  reward: string;
}
export interface MyPageRepresentiveDogDto {
  dogName: string;
  inStock: boolean;
  recipeName: string;
  thumbnailUrl?: null | string;
}

export interface MyPageInfoData {
  couponCount: number;
  deliveryCount: number;
  mypageDogDtoList?: null | DogData[];
  mypageMemberDto: MyPageMemberDto;
  mypageRepresentiveDogDto: MyPageRepresentiveDogDto;
}

export interface DogData {
  id: number;
  name: string;
  representative: boolean;
  birth: string;
  plan: string;
  gender: string;
  itemNames: string;
  nextDeliveryDate?: null | string | Date;
  dogPictureId?: null | string | number;
  pictureName?: null | string;
  pictureUrl?: null | string;
  recipeNames: string;
  startDate?: null | string | Date;
  subscribeId: number;
  subscribeCount: number;
  subscribeStatus: string;
}

export interface CouponData {
  id: number;
  name: string;
  status: string;
  amount: number;
  remaining: number;
  availableMaxDiscount: number;
  availableMinPrice: number;
  couponTarget: string;
  description: string;
  discountDegree: number;
  discountType: string;
  expiredDate: string | Date;
}

export type RewardFilterType = 'ALL' | 'SAVED' | 'USED' | 'EXPIRED';

export interface RewardData {
  name: string;
  tradeReward: number;
  rewardStatus: string;
  createdTime: string | Date;
}


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

export interface SubscribeDto {
  id: number;
  subscribeStatus: string;
  dogId: number;
  dogName: string;
  cancelReason?: null | string;
  subscribeCount: number;
  plan: string;
  oneMealGramsPerRecipe: string;
  oneDayRecommendKcal: number;
  nextPaymentDate: string;
  countSkipOneTime: number;
  countSkipOneWeek: number;
  nextPaymentPrice: number;
  discountCoupon: number;
  discountGrade: number;
  overDiscount: number;
  nextDeliveryDate: string;
  usingMemberCouponId?: null;
  couponName?: null;
  previousOrderConfirmDate?: null;
  subscriptionMonth?: null | number | string;
}

export interface GeneralOrderData {
  itemNameList: OrderItem[];
  orderDto: OrderDto;
  thumbnailUrl: string;
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