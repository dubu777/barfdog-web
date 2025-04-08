import axiosInstance from "@/api/axiosInstance";
import { queryKeys } from "@/constants";
import { AUTH_CONFIG } from "@/constants/auth";
import { QueryClient } from "@tanstack/react-query";
import { cookies } from "next/headers";

export async function prefetchGetAddressList(queryClient: QueryClient) {
  const cookieStore = cookies();
  const token = cookieStore.get(AUTH_CONFIG.ACCESS_TOKEN_COOKIE)?.value;
  
  await queryClient.prefetchQuery({
    queryKey: [queryKeys.DELIVERY.BASE, queryKeys.DELIVERY.GET_ADDRESS_LIST],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/api/address', {
        headers: token ? {
          Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`
        } : {}
      });
      return data._embedded.addressResponseDtoList;
    }
  });
}