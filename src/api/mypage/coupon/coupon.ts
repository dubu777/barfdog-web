import { AxiosInstance } from "axios";
import axiosInstance from "@/api/axiosInstance";
import { Coupon } from "@/types";

const getCouponList = async (instance: AxiosInstance = axiosInstance): Promise<Coupon[]> => {
	const { data } = await instance.get('/api/coupons');
	return data.couponsPageDto?._embedded?.queryCouponsDtoList || [];
}

const createCoupon = async (code: string) => {
	const { data } = await axiosInstance.put('/api/coupons/code', { code });
	return data;
}

export {
	getCouponList,
	createCoupon,
}