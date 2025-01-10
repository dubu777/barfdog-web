import axiosInstance from "@/api/axiosInstance";
import { CartInfo, UpdateCartInfo } from "@/types";

export { getCartInfo, updateCartInfo };

const getCartInfo = async (): Promise<CartInfo> => {
    const { data } = await axiosInstance.get('/api/baskets');
    return data;
}

const updateCartInfo = async (body: UpdateCartInfo) => {
    const { data } = await axiosInstance.post('/api/baskets', body);
    return data;
}