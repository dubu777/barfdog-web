import { QueryClient, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { getMypageInfo } from "@/api/mypage/mypage";
import { queryKeys } from "@/constants";
import { MyPageInfoData } from "@/types/myPage";

export { useGetMypageInfo, prefetchGetMypageInfo }

const getMypageInfoQueryKey = [queryKeys.MYPAGE, queryKeys.GET_MYPAGE_INFO];

function useGetMypageInfo() {
  const queryClient = useQueryClient();
  return useSuspenseQuery<MyPageInfoData>({
    queryKey: getMypageInfoQueryKey,
    queryFn: getMypageInfo,
    initialData: () => queryClient.getQueryData(getMypageInfoQueryKey),
  });
}

async function prefetchGetMypageInfo(queryClient: QueryClient) {
  await queryClient.prefetchQuery<MyPageInfoData>({
    queryKey: getMypageInfoQueryKey,
    queryFn: getMypageInfo,
  });
}