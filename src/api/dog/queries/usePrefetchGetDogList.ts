import { queryKeys } from "@/constants/queryKeys";
import { AUTH_CONFIG } from "@/constants/auth";
import { QueryClient } from "@tanstack/react-query";
import { cookies } from "next/headers";
import { DogData } from "@/types";
import axiosInstance from "@/api/axiosInstance";

export async function prefetchGetDogList(queryClient: QueryClient) {
  const cookieStore = cookies();
  const token = cookieStore.get(AUTH_CONFIG.ACCESS_TOKEN_COOKIE)?.value;

  await queryClient.prefetchQuery<DogData[]>({
    queryKey: [queryKeys.DOG.BASE, queryKeys.DOG.GET_DOG_LIST],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/api/dogs", {
        headers: token
          ? {
              Authorization: token.startsWith("Bearer ")
                ? token
                : `Bearer ${token}`,
            }
          : {},
      });
      return data?._embedded?.queryDogsDtoList || [];
    },
  });
}