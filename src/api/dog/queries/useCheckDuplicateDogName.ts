import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { CheckDuplicateDogNameResponse, UseQueryCustomOptions } from "@/types";
import { checkDuplicateDogName } from "../dog";


export function useCheckDuplicateDogName(dogName: string, queryOptions?: UseQueryCustomOptions<CheckDuplicateDogNameResponse>) {
  return useQuery({
    queryFn: async () => await checkDuplicateDogName(dogName),
    queryKey: [queryKeys.DOG.BASE, queryKeys.DOG.CHECK_DUPLICATE_DOG_NAME, dogName],
    ...queryOptions,
  })
}
