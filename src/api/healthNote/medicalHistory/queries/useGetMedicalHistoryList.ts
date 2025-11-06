import { queryKeys } from "@/constants/queryKeys";
import { UseSuspenseQueryCustomOptions } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getMedicalHistoryList } from "../medicalHistory";
import { MedicalHistoryData } from "@/types/healthNote/medicalHistory";

export function useGetMedicalHistoryList(petId: number, queryOptions?: UseSuspenseQueryCustomOptions<MedicalHistoryData[]>) {
  return useSuspenseQuery({
    queryFn: () => getMedicalHistoryList(petId),
    queryKey: [
      queryKeys.MEDICAL_HISTORY.BASE,
      queryKeys.MEDICAL_HISTORY.GET_MEDICAL_HISTORY_LIST,
      petId,
    ],
    ...queryOptions,
  });
}
