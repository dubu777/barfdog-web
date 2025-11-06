import { AddressRequest, AddressResponse } from "@/types/delivery";
import axiosInstance from "../axiosInstance";

// 주소 리스트 조회
const getAddressList = async (): Promise<AddressResponse[]> => {
  const { data } = await axiosInstance.get("/api/v2/address");

  if (data.success) {
    return data.data.content;
  }
  const message = data.detailMessage ?? "주소 정보를 불러오지 못했습니다";
  throw new Error(message);
};

// 주소 등록
const createAddress = async (body: AddressRequest) => {
  const { data } = await axiosInstance.post("/api/v2/address", body);

  return data;
};

// 주소 변경
const updateAddress = async ({
  deliveryId,
  body,
}: {
  deliveryId: number;
  body: AddressRequest;
}) => {
  const { data } = await axiosInstance.put(
    `/api/v2/address/update/${deliveryId}`,
    body
  );

  return data;
};

// 주소 삭제
const deleteAddress = async (deliveryId: number) => {
  const { data } = await axiosInstance.delete(
    `/api/v2/address/delete/${deliveryId}`
  );

  return data;
};

export { getAddressList, createAddress, updateAddress, deleteAddress };
