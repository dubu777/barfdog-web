import axiosInstance from "@/api/axiosInstance";

const getCouponList = async () => {
  const { data } = await axiosInstance.get('/api/coupons');
  return data;
}

const applyCoupon = async (body: { code: string }) => {
  const { data } = await axiosInstance.put('/api/coupons/code', body);
  return data;
}

export { getCouponList, applyCoupon }