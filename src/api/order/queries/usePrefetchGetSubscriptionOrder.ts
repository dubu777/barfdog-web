import axiosInstance from "@/api/axiosInstance";
import { queryKeys } from "@/constants";
import { AUTH_CONFIG } from "@/constants/auth";
import { SubscriptionOrderSheetResponse } from "@/types";
import { QueryClient } from "@tanstack/react-query";
import { cookies } from "next/headers";


export async function prefetchGetSubscriptionOrder(queryClient: QueryClient, subscribeId: number) {
  const cookieStore = cookies();
  const token = cookieStore.get(AUTH_CONFIG.ACCESS_TOKEN_COOKIE)?.value;

  await queryClient.prefetchQuery<SubscriptionOrderSheetResponse>({
    queryKey: [queryKeys.ORDER.BASE, queryKeys.ORDER.GET_SUBSCRIPTION_ORDER, subscribeId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/api/orders/sheet/subscribe/${subscribeId}`, {
        headers: token ? {
          Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`
        } : {}
      });
      return data;
    }
  });
}