interface DeliveryAddress {
  id: number;
  deliveryName: string;
  recipientName: string;
  phoneNumber: string;
  zipcode: string;
  city?: string;
  street: string;
  detailAddress: string;
  isDefault: boolean;
  request: string;
  petName?: string;
}

interface DeliveryRequest {
  deliveryName: string;
  recipientName: string;
  phoneNumber: string;
  zipcode: string;
  street: string;
  detailAddress: string;
  isDefault: boolean;
  request: string;
}

interface AddressRequest {
  deliveryName: string;
  recipientName: string;
  phoneNumber: string;
  zipcode: string;
  city: string;
  street: string;
  detailAddress: string;
  request: string;
  isDefault: boolean;
}

export type { DeliveryAddress, AddressRequest, DeliveryRequest };
