import { CartInfo, UpdateCartInfo } from "@/types";
import axiosInstance from "@/api/axiosInstance";
import { AxiosInstance } from "axios";
import { validateApiResponse } from "@/utils/api/apiResponseUtils";

const getCartInfo = async (
  instance: AxiosInstance = axiosInstance
): Promise<CartInfo> => {
  const { data } = await instance.get("/api/v2/user/baskets");
  return validateApiResponse(data, "장바구니 조회에 실패했습니다");
};

const updateCartInfo = async (body: UpdateCartInfo) => {
  const { data } = await axiosInstance.post("/api/v2/user/baskets", body);
  return data;
};

const increaseCartItem = async (itemId: number) => {
  const { data } = await axiosInstance.put(`/api/baskets/${itemId}/increase`, {
    id: itemId,
  });
  return data;
};
const updateCartItemQuantity = async ({
  basketId,
  amount,
}: {
  basketId: number;
  amount: number;
}) => {
  const { data } = await axiosInstance.put(`/api/v2/user/baskets/${basketId}`, {
    amount,
  });
  return data;
};

const decreaseCartItem = async (itemId: number) => {
  const { data } = await axiosInstance.put(`/api/baskets/${itemId}/decrease`, {
    id: itemId,
  });
  return data;
};

const deleteCartItems = async (basketIdList: number[]) => {
  const { data } = await axiosInstance.delete(`/api/v2/user/baskets`, {
    data: {
      basketIdList,
    },
  });
  return data;
};

export {
  getCartInfo,
  updateCartInfo,
  increaseCartItem,
  decreaseCartItem,
  deleteCartItems,
  updateCartItemQuantity,
};
