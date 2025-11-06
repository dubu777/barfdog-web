import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { ApiResponse, UseQueryCustomOptions } from "@/types";
import { checkDuplicateEmail } from "../auth";

export function useCheckDuplicateEmail(
  email: string,
  queryOptions?: UseQueryCustomOptions<ApiResponse<string>>
) {
  return useQuery({
    queryFn: async () => await checkDuplicateEmail(email),
    queryKey: [
      queryKeys.AUTH.BASE,
      queryKeys.AUTH.CHECK_EMAIL,
      email,
    ],
    ...queryOptions,
  });
}
