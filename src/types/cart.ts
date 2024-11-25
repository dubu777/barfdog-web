export interface CartItemDto {
  amount: number;
  basketId: number;
  deliveryFree: boolean;
  itemId: number;
  name: string;
  originalPrice: number;
  salePrice: number;
  thumbnailUrl: string;
}

export interface CartItemOptionDto {
  id: number;
  name: string;
  optionPrice: number;
  amount: number;
}

export interface BasketDto {
  itemDto: CartItemDto;
  itemOptionDtoList: CartItemOptionDto[];
  totalPrice: number;
}

export interface DeliveryConstant {
  freeCondition: number;
  price: number;
}