import { useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { UseSuspenseQueryCustomOptions } from "@/types";
import { getPetDetail } from "../pet";
import { Pet } from "@/types/pet";

export function useGetPetDetail(
  petId: number,
  queryOptions?: UseSuspenseQueryCustomOptions<Pet>
) {
  return useSuspenseQuery({
    queryFn: () => getPetDetail(petId),
    queryKey: [queryKeys.PET.BASE, queryKeys.PET.GET_PET_DETAIL],
    ...queryOptions,
  });
}
