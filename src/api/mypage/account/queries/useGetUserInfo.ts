import { UseSuspenseQueryCustomOptions } from "@/types";
import { useSuspenseQuery} from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { UserInfo } from "@/types/mypage/account";
import { getUserInfo } from "../account";

export function useGetUserInfo(queryOptions?: UseSuspenseQueryCustomOptions<UserInfo | null>) {
	return useSuspenseQuery<UserInfo | null>({
		queryKey: [queryKeys.MYPAGE.BASE, queryKeys.MYPAGE.ACCOUNT.BASE, queryKeys.MYPAGE.ACCOUNT.GET_USER_INFO],
		queryFn: () => getUserInfo(),
		...queryOptions,
	})}
