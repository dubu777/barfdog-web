import axiosInstance from "@/api/axiosInstance";
import { CartData } from "@/types";

export { getCartData };

const getCartData = async (): Promise<CartData> => {
    const { data } = await axiosInstance.get('/api/baskets');
    return data;
}