interface CartItemDto {
  amount: number;
  basketId: number;
  deliveryFree: boolean;
  itemId: number;
  name: string;
  originalPrice: number;
  salePrice: number;
  thumbnailUrl: string;
}

interface CartItemOptionDto {
  id: number;
  name: string;
  optionPrice: number;
  amount: number;
  itemOptionId?: number;
}

interface BasketDto {
  itemDto: CartItemDto;
  itemOptionDtoList: CartItemOptionDto[];
  totalPrice: number;
}

interface DeliveryConstant {
  freeCondition: number;
  price: number;
}

interface CartSummary {
  productTotalPrice: number;
  discount: number;
  deliveryFee: number;
  totalOrderPrice: number;
  diffDeliveryFee: number;
}

interface CartInfo {
  basketDtoList: BasketDto[];
  deliveryConstant: DeliveryConstant;
}

interface CartOption {
  optionId: number;
  optionAmount: number;
}

interface UpdateCartInfo {
  itemId: number;
  itemAmount: number;
  optionDtoList: CartOption[];
}

export type {
  CartItemDto,
  CartItemOptionDto,
  BasketDto,
  DeliveryConstant,
  CartSummary,
  CartInfo,
  CartOption,
  UpdateCartInfo,
};