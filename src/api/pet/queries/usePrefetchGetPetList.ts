import { QueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { createSSRRequest } from "@/api/withAuthSSR";
import { PetListResponse } from "@/types/pet";
import { getPetList } from "../pet";

export async function prefetchGetPetList(queryClient: QueryClient) {
  const ssrAxios = createSSRRequest();
  return await queryClient.prefetchQuery<PetListResponse>({
    queryKey: [queryKeys.PET.BASE, queryKeys.PET.GET_PET_LIST],
    queryFn: async () => getPetList(ssrAxios),
  });
}
