export type {AddressResponse, AddressRequest}

interface AddressResponse {
  id: number;
  city: string;
  street: string;
  zipcode: string;
  detailAddress: string;
  phoneNumber: string;
  recipientName: string;
  deliveryName: string | null;
  default: boolean;
  request: string | null;
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
}
