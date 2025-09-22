import { useQuery } from "@tanstack/react-query";
import { getMyPageInfoTemp, getMyPageInfo } from "@/api/mypage/common/common";
import { queryKeys } from "@/constants";
import { MyPageInfoDataTemp, MyPageInfoData } from "@/types/mypage/common";
import { UseQueryCustomOptions } from "@/types";

// 추후 제거 필요
export function useGetMyPageInfoTemp(queryOptions?: UseQueryCustomOptions<MyPageInfoDataTemp>){
  return useQuery<MyPageInfoDataTemp>({
    queryKey: [queryKeys.MYPAGE.BASE, queryKeys.MYPAGE.GET_MYPAGE_INFO],
    queryFn: () => getMyPageInfoTemp(),
    ...queryOptions,
  });
}

export function useGetMyPageInfo(queryOptions?: UseQueryCustomOptions<MyPageInfoData>){
  return useQuery<MyPageInfoData>({
    queryKey: [queryKeys.MYPAGE.BASE, queryKeys.MYPAGE.GET_MYPAGE_INFO],
    queryFn: () => getMyPageInfo(),
    ...queryOptions,
  });
}