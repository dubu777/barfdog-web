import { useSuspenseQuery } from "@tanstack/react-query";
import { getMyPageInfo } from "@/api/mypage/mypage";
import { queryKeys } from "@/constants";
import { MyPageInfoData } from "@/types/mypage";
import { UseSuspenseQueryCustomOptions } from "@/types";

export function useGetMyPageInfo(queryOptions?: UseSuspenseQueryCustomOptions<MyPageInfoData>){
  return useSuspenseQuery<MyPageInfoData>({
    queryKey: [queryKeys.MYPAGE.BASE, queryKeys.MYPAGE.GET_MYPAGE_INFO],
    queryFn: () => getMyPageInfo(),
    ...queryOptions,
  });
}