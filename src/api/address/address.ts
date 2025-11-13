import { AddressRequest, AddressResponse } from "@/types/delivery";
import axiosInstance from "../axiosInstance";
import { AddressFormValues } from "@/utils/validation/addressValidation";

// 주소 리스트 조회
const getAddressList = async (): Promise<AddressResponse[]> => {
  const { data } = await axiosInstance.get("/api/v2/address");

  if (data.success) {
    return data.data.content;
  }
  throw new Error("배송지 조회에 실패했습니다");
};

// 주소 등록
const createAddress = async (body: AddressFormValues) => {
  const { data } = await axiosInstance.post("/api/v2/address", body);

  return data;
};

// 주소 변경
const updateAddress = async ({
  addressId,
  body,
}: {
  addressId: number;
  body: AddressFormValues;
}) => {
  const { data } = await axiosInstance.put(
    `/api/v2/address/update/${addressId}`,
    body
  );

  return data;
};

// 주소 삭제
const deleteAddress = async (addressId: number) => {
  const { data } = await axiosInstance.delete(
    `/api/v2/address/delete/${addressId}`
  );

  return data;
};

export { getAddressList, createAddress, updateAddress, deleteAddress };
