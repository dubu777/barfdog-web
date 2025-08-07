import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { ApiResponse, UseQueryCustomOptions } from "@/types";
import { checkDuplicatePetName } from "../pet";

export function useCheckDuplicatePetName(
  petName: string,
  queryOptions?: UseQueryCustomOptions<ApiResponse<string>>
) {
  return useQuery({
    queryFn: async () => await checkDuplicatePetName(petName),
    queryKey: [
      queryKeys.PET.BASE,
      queryKeys.PET.CHECK_DUPLICATE_PET_NAME,
      petName,
    ],
    ...queryOptions,
  });
}
