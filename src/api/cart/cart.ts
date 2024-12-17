import axiosInstance from "@/api/axiosInstance";
import { CartInfo } from "@/types";

export { getCartInfo };

const getCartInfo = async (): Promise<CartInfo> => {
    const { data } = await axiosInstance.get('/api/baskets');
    return data;
}