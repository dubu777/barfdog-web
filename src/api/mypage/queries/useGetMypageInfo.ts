import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { getMyPageInfo } from "@/api/mypage/mypage";
import { queryKeys } from "@/constants";
import { MyPageInfoData } from "@/types/mypage";
import { UseSuspenseQueryCustomOptions } from "@/types";

export { useGetMyPageInfo, prefetchGetMyPageInfo }

const getMyPageInfoQueryKey = [queryKeys.MYPAGE.BASE, queryKeys.MYPAGE.GET_MYPAGE_INFO];

function useGetMyPageInfo(queryOptions?: UseSuspenseQueryCustomOptions<MyPageInfoData>){
  return useSuspenseQuery<MyPageInfoData>({
    queryKey: getMyPageInfoQueryKey,
    queryFn: getMyPageInfo,
    ...queryOptions,
  });
}

async function prefetchGetMyPageInfo(queryClient: QueryClient) {
  await queryClient.prefetchQuery<MyPageInfoData>({
    queryKey: getMyPageInfoQueryKey,
    queryFn: getMyPageInfo,
  });
}