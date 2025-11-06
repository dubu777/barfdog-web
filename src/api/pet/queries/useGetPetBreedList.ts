import { useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { UseSuspenseQueryCustomOptions } from "@/types";
import { getPetBreedList } from "../pet";
import { PetBreedList } from "@/types/pet";

export function useGetPetBreedList(
  queryOptions?: UseSuspenseQueryCustomOptions<PetBreedList>
) {
  return useSuspenseQuery({
    queryFn: () => getPetBreedList(),
    queryKey: [queryKeys.PET.BASE, queryKeys.PET.GET_PET_BREED_LIST],
    ...queryOptions,
  });
}
