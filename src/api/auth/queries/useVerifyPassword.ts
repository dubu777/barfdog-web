import { UseQueryCustomOptions } from "@/types";
import { useQuery} from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { verifyPassword } from "@/api/auth/auth";

export function useVerifyPassword(queryOptions?: UseQueryCustomOptions) {
	return useQuery({
		queryKey: [queryKeys.AUTH.BASE, queryKeys.AUTH.VERIFY_PASSWORD],
		queryFn: () => verifyPassword(),
		...queryOptions,
	})
}