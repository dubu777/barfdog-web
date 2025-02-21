import { useQuery } from "@tanstack/react-query";
import { loginWithProvider } from "@/api/auth/auth";
import { LoginUserInfo, SnSProvider } from "@/types";
import { queryKeys } from "@/constants";

export { useLoginWithProvider };

function useLoginWithProvider(provider: SnSProvider, code: string) {
	return useQuery<LoginUserInfo, Error>({
		queryKey: [queryKeys.AUTH.BASE, queryKeys.AUTH.LOGIN, provider, code],
		queryFn: async () => await loginWithProvider(provider, code),
		// 코드가 있을경우 실행
		enabled: !!code,
	})
}
