import { QueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { createSSRRequest } from "@/api/withAuthSSR";
import { PetBreedList } from "@/types/pet";
import { getPetBreedList } from "../pet";

export async function prefetchGetPetBreedList(queryClient: QueryClient) {
  const ssrAxios = createSSRRequest();
  return await queryClient.prefetchQuery<PetBreedList>({
    queryKey: [queryKeys.PET.BASE, queryKeys.PET.GET_PET_BREED_LIST],
    queryFn: async () => getPetBreedList(ssrAxios),
  });
}
