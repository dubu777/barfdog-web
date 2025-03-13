import { AddressRequest, AddressResponse } from "@/types/delivery";
import axiosInstance from "../axiosInstance";

export { getAddressList, applyAddress, updateAddress, deleteAddress };

// 주소 리스트 조회
const getAddressList = async (): Promise<AddressResponse[]> => {
  const { data } = await axiosInstance.get("/api/address");

  return data._embedded.addressResponseDtoList;
};

// 주소 등록
const applyAddress = async (body: AddressRequest): Promise<any> => {
  const { data } = await axiosInstance.post("/api/address", body);

  return data;
};

// 주소 변경
const updateAddress = async ({
  deliveryId,
  body,
}: {
  deliveryId: number;
  body: AddressRequest;
}): Promise<any> => {
  const { data } = await axiosInstance.put(`/api/address/${deliveryId}`, body);

  return data;
};

// 주소 삭제
const deleteAddress = async (deliveryId: number): Promise<any> => {
  const { data } = await axiosInstance.delete(`/api/address/${deliveryId}`);

  return data;
};
