import { CartInfo, UpdateCartInfo } from "@/types";
import axiosInstance from "@/api/axiosInstance";
import { AxiosInstance } from "axios";

export {
	getCartInfo,
	updateCartInfo,
	increaseCartItem,
	decreaseCartItem,
	deleteCartItemById,
	deleteCartItemByIds,
};

const getCartInfo = async (instance: AxiosInstance = axiosInstance): Promise<CartInfo> => {
	const { data } = await instance.get('/api/baskets');
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
	const { data } = await axiosInstance.delete(`/api/baskets/${itemId}`, {
		data: { id: itemId }
	});
	return data;
}

const deleteCartItemByIds = async (deleteBasketIdList: number[]) => {
	const { data } = await axiosInstance.delete(`/api/baskets`, {
		data: deleteBasketIdList,
	});
	return data;
}