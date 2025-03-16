import * as yup from "yup";
import { AddressRequest } from "@/types/delivery";

export const addressSchema = yup.object().shape({
  deliveryName: yup.string().required('배송지 이름은 필수입니다.'),
  recipientName: yup.string().required('받는 사람 이름은 필수입니다.'),
  phoneNumber: yup.string().required('전화번호는 필수입니다.'),
  zipcode: yup.string().required('우편번호는 필수입니다.'),
  street: yup.string().required('도로명 주소는 필수입니다.'),
  city: yup.string().required('도로명 주소는 필수입니다.'),
  detailAddress: yup.string().required('상세 주소는 필수입니다.'),
  request: yup.string().max(100, '요청사항은 최대 100자까지 입력 가능합니다.'),
})

export const defaultAddressValues = (addressData?: AddressRequest): AddressRequest => ({
  deliveryName: addressData?.deliveryName ?? '',
  recipientName: addressData?.recipientName ?? '',
  phoneNumber: addressData?.phoneNumber ?? '',
  zipcode: addressData?.zipcode ?? '',
  street: addressData?.street ?? '',
  city: addressData?.city ?? '',
  detailAddress: addressData?.detailAddress ?? '',
  request: addressData?.request ?? '',
});
