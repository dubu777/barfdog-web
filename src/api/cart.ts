import axiosInstance from "@/api/axiosInstance";
import { CartData } from "@/types";

const getCartData = async (): Promise<CartData> => {
    const { data } = await axiosInstance.get('/api/baskets');
    return data;
}

export { getCartData };