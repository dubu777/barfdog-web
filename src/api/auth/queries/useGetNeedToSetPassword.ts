import { UseQueryCustomOptions } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getNeedToSetPassword } from "@/api/auth/auth";

export { useGetNeedToSetPassword };

function useGetNeedToSetPassword(queryOptions?: UseQueryCustomOptions) {
	return useQuery({
		queryKey: [],
		queryFn: getNeedToSetPassword,
		...queryOptions,
	})
}