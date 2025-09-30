import { UseQueryCustomOptions } from "@/types";
import { useQuery} from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { verifyPassword } from "../account";

export function useVerifyPassword(queryOptions?: UseQueryCustomOptions) {
	return useQuery({
		queryKey: [queryKeys.MYPAGE.BASE, queryKeys.MYPAGE.ACCOUNT.BASE, queryKeys.MYPAGE.ACCOUNT.VERIFY_PASSWORD],
		queryFn: () => verifyPassword(),
		...queryOptions,
	})
}