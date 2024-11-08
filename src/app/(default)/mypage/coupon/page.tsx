import Coupon from "@/components/pages/mypage/coupon/Coupon";
import axiosInstance from "@/api/axiosInstance";

export default async function CouponPage() {
  const couponResponse = await axiosInstance.get('/api/coupons');
  return (
    <Coupon couponListData={couponResponse.data.couponsPageDto._embedded.queryCouponsDtoList}/>
  )
}
