import { QueryClient, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { getMyPageInfo } from "@/api/mypage/myPage";
import { queryKeys } from "@/constants";
import { MyPageInfoData } from "@/types/myPage";

export { useGetMyPageInfo, prefetchGetMyPageInfo }

const getMyPageInfoQueryKey = [queryKeys.MYPAGE, queryKeys.GET_MYPAGE_INFO];

function useGetMyPageInfo() {
  const queryClient = useQueryClient();
  return useSuspenseQuery<MyPageInfoData>({
    queryKey: getMyPageInfoQueryKey,
    queryFn: getMyPageInfo,
    initialData: () => queryClient.getQueryData(getMyPageInfoQueryKey),
  });
}

async function prefetchGetMyPageInfo(queryClient: QueryClient) {
  await queryClient.prefetchQuery<MyPageInfoData>({
    queryKey: getMyPageInfoQueryKey,
    queryFn: getMyPageInfo,
  });
}