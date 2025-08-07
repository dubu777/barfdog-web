import { useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { UseSuspenseQueryCustomOptions } from "@/types";
import { getPetList } from "../pet";
import { PetListResponse } from "@/types/pet";

export function useGetPetList(
  queryOptions?: UseSuspenseQueryCustomOptions<PetListResponse>
) {
  return useSuspenseQuery({
    queryFn: () => getPetList(),
    queryKey: [queryKeys.PET.BASE, queryKeys.PET.GET_PET_LIST],
    ...queryOptions,
  });
}
