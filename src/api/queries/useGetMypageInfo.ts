import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { getMypageInfo } from "@/api/mypage";
import { queryKeys } from "@/constants";
import { MyPageInfoData } from "@/types/myPage";

export function useGetMypageInfo() {
  return useSuspenseQuery<MyPageInfoData>({
    queryKey: [queryKeys.MYPAGE, queryKeys.GET_MYPAGE_INFO],
    queryFn: getMypageInfo,
    initialData: (data: MyPageInfoData) => data,
  });
}

export async function prefetchGetMypageInfo(queryClient: QueryClient) {
  await queryClient.prefetchQuery<MyPageInfoData>({
    queryKey: [queryKeys.MYPAGE, queryKeys.GET_MYPAGE_INFO],
    queryFn: getMypageInfo,
  });
}