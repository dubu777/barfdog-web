import { CartInfo, UpdateCartInfo } from "@/types";
import axiosInstance from "@/api/axiosInstance";

export {
	getCartInfo,
	updateCartInfo,
	increaseCartItem,
	decreaseCartItem,
	deleteCartItemById,
	deleteCartItemByIds,
};

const getCartInfo = async (): Promise<CartInfo> => {
	const { data } = await axiosInstance.get('/api/baskets');
	return data;
}

const updateCartInfo = async (body: UpdateCartInfo) => {
	const { data } = await axiosInstance.post('/api/baskets', body);
	return data;
}

const increaseCartItem = async (itemId: number) => {
	const { data } = await axiosInstance.put(`/api/baskets/${itemId}/increase`, { id: itemId });
	return data;
}

const decreaseCartItem = async (itemId: number) => {
	const { data } = await axiosInstance.put(`/api/baskets/${itemId}/decrease`, { id: itemId });
	return data;
}

const deleteCartItemById = async (itemId: number) => {
	const { data } = await axiosInstance.delete(`/api/baskets/${itemId}`, { id: itemId });
	return data;
}

const deleteCartItemByIds = async (deleteBasketIdList: number[]) => {
	const { data } = await axiosInstance.delete(`/api/baskets`, deleteBasketIdList);
	return data;
}