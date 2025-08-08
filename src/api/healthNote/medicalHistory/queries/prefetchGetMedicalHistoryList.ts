import { queryKeys } from "@/constants/queryKeys";
import { QueryClient } from "@tanstack/react-query";
import { getMedicalHistoryList } from "../medicalHistory";
import { createSSRRequest } from "@/api/withAuthSSR";

export async function prefetchGetMedicalHistoryList(petId: number, queryClient: QueryClient) {
  const ssrAxios = createSSRRequest();
  await queryClient.prefetchQuery({
    queryFn: () => getMedicalHistoryList(petId, ssrAxios),
    queryKey: [
      queryKeys.MEDICAL_HISTORY.BASE,
      queryKeys.MEDICAL_HISTORY.GET_MEDICAL_HISTORY_LIST,
      petId,
    ],
  });
}
