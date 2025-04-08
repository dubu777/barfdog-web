// api/mypage/queries/serverPrefetch.ts
import { cookies } from 'next/headers';
import { AUTH_CONFIG } from '@/constants/auth';
import { QueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/constants/queryKeys';
import { Coupon } from '@/types';
import axiosInstance from '@/api/axiosInstance';

const getCouponListQueryKey = [queryKeys.COUPON.BASE, queryKeys.COUPON.GET_COUPON_LIST];

export async function prefetchGetCouponList(queryClient: QueryClient) {
  const cookieStore = cookies();
  const token = cookieStore.get(AUTH_CONFIG.ACCESS_TOKEN_COOKIE)?.value;
  console.log('서버 사이드 토큰', token);
  
  await queryClient.prefetchQuery<Coupon[]>({
    queryKey: getCouponListQueryKey,
    queryFn: async () => {
      const { data } = await axiosInstance.get('/api/coupons', {
        headers: token ? {
          Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`
        } : {}
      });
      return data.couponsPageDto?._embedded?.queryCouponsDtoList || [];
    }
  });
}