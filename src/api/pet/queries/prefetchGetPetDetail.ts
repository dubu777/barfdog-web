import { QueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { createSSRRequest } from "@/api/withAuthSSR";
import { getPetDetail } from "../pet";
import { Pet } from "@/types/pet";

export async function prefetchGetPetDetail(
  queryClient: QueryClient,
  petId: number
) {
  const ssrAxios = createSSRRequest();
  return await queryClient.prefetchQuery<Pet>({
    queryKey: [queryKeys.PET.BASE, queryKeys.PET.GET_PET_DETAIL, petId],
    queryFn: () => getPetDetail(petId, ssrAxios),
  });
}
