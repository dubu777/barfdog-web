import { useQuery } from "@tanstack/react-query";
import { getMyPageInfo } from "@/api/mypage/common/common";
import { queryKeys } from "@/constants";
import { MyPageInfoData } from "@/types/mypage/common";
import { UseQueryCustomOptions } from "@/types";

export function useGetMyPageInfo(queryOptions?: UseQueryCustomOptions<MyPageInfoData>){
  return useQuery<MyPageInfoData>({
    queryKey: [queryKeys.MYPAGE.BASE, queryKeys.MYPAGE.COMMON.BASE, queryKeys.MYPAGE.COMMON.GET_MYPAGE_INFO],
    queryFn: () => getMyPageInfo(),
    ...queryOptions,
  });
}