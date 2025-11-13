import * as yup from "yup";
import { AddressRequest, AddressResponse } from "@/types/delivery";

export const addressSchema = yup.object().shape({
  deliveryName: yup
    .string()
    .max(20, "배송지 이름은 최대 20자까지 입력 가능합니다.")
    .required("배송지 이름은 필수입니다."),
  recipientName: yup
    .string()
    .max(40, "받는 사람 이름은 최대 40자까지 입력 가능합니다.")
    .required("받는 사람 이름은 필수입니다."),
  phoneNumber: yup
    .string()
    .matches(
      /^\d{10,11}$/,
      "전화번호는 숫자만 입력 가능하며 10~11자리여야 합니다."
    )
    .required("전화번호는 필수입니다."),
  zipcode: yup.string().required("우편번호는 필수입니다."),
  street: yup.string().required("도로명 주소는 필수입니다."),
  city: yup.string().required("도로명 주소는 필수입니다."),
  detailAddress: yup
    .string()
    .max(50, "상세 주소는 최대 50자까지 입력 가능합니다."),
  request: yup.string().max(50, "요청사항은 최대 50자까지 입력 가능합니다."),
  isDefault: yup.boolean(),
});

export type AddressFormValues = yup.InferType<typeof addressSchema>;

export const defaultAddressValues = (
  addressData?: AddressResponse
): AddressRequest => ({
  deliveryName: addressData?.deliveryName ?? "",
  recipientName: addressData?.recipientName ?? "",
  phoneNumber: addressData?.phoneNumber ?? "",
  zipcode: addressData?.zipcode ?? "",
  street: addressData?.street ?? "",
  city: addressData?.city ?? "",
  detailAddress: addressData?.detailAddress ?? "",
  request: addressData?.request ?? "",
  isDefault: addressData?.isDefault ?? false,
});
