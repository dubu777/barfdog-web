import { DeliveryAddress, DeliveryRequest, PackageableDelivery } from "@/types";

/**
 * DeliveryAddress를 DeliveryRequest로 변환하는 유틸 함수
 * - DeliveryRequest는 API 요청 시 사용되는 타입으로, id와 city 필드를 제외한 나머지 필드를 포함
 */
export function convertToDeliveryRequest(
  deliveryAddress: DeliveryAddress
): DeliveryRequest {
  return {
    deliveryName: deliveryAddress.deliveryName,
    recipientName: deliveryAddress.recipientName,
    phoneNumber: deliveryAddress.phoneNumber,
    zipcode: deliveryAddress.zipcode,
    street: deliveryAddress.street,
    detailAddress: deliveryAddress.detailAddress,
    isDefault: deliveryAddress.isDefault,
    request: deliveryAddress.request,
  };
}

export function convertToDeliveryAddresses(
  pakageableDeliveryList: PackageableDelivery[]
): DeliveryAddress[] {
  return pakageableDeliveryList.map((delivery) => ({
    id: delivery.id,
    petName: delivery.petName,
    deliveryName: delivery.deliveryName,
    recipientName: delivery.recipientName,
    phoneNumber: delivery.phoneNumber,
    zipcode: delivery.zipcode,
    street: delivery.street,
    detailAddress: delivery.detailAddress,
    isDefault: false,
    request: delivery.request,
  }));
}
