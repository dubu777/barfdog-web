interface DisplayImageUrl {
  url: string;
}

interface CartItemDto {
  basketId: number;
  itemId: number;
  name: string;
  displayImageUrl: DisplayImageUrl;
  amount: number;
  totalOriginalPrice: number;
  totalSalePrice: number;
  totalDiscountProduct: number;
  deliveryFree: boolean;
  type: string;
  isSoldOut: boolean;
  itemOptionList: CartItemOptionDto[];
}

interface CartItemOptionDto {
  optionId: number;
  name: string;
  amount: number;
  totalOriginalPrice: number;
  isSoldOut: boolean;
}

interface PaymentInfo {
  originalPrice: number;
  paymentPrice: number;
  discountProduct: number;
  deliveryPrice: number;
  deliveryFreeCondition: number;
}

interface CartSummary {
  productTotalPrice: number;
  discount: number;
  deliveryFee: number;
  totalOrderPrice: number;
  diffDeliveryFee: number;
}

interface CartInfo {
  paymentInfo: PaymentInfo;
  orderableItemList: CartItemDto[];
  soldOutItemList: CartItemDto[];
}

// Deprecated - 이전 API 스펙용 (하위 호환성 위해 유지)
interface BasketDto {
  itemDto: {
    amount: number;
    basketId: number;
    deliveryFree: boolean;
    itemId: number;
    name: string;
    originalPrice: number;
    salePrice: number;
    thumbnailUrl: string;
  };
  itemOptionDtoList: Array<{
    id: number;
    name: string;
    optionPrice: number;
    amount: number;
    itemOptionId?: number;
  }>;
  totalPrice: number;
}

interface DeliveryConstant {
  freeCondition: number;
  price: number;
}

interface CartItemOption {
  id: number;
  amount: number;
}

interface UpdateCartInfo {
  itemId: number;
  itemAmount: number;
  itemOptionList: CartOption[];
}

// Deprecated - 이전 API 스펙용 (하위 호환성 위해 유지)
interface CartOption {
  optionId: number;
  optionAmount: number;
}

export type {
  DisplayImageUrl,
  CartItemDto,
  CartItemOptionDto,
  PaymentInfo,
  CartSummary,
  CartInfo,
  CartItemOption,
  UpdateCartInfo,
  CartOption,
  BasketDto,
  DeliveryConstant,
};
