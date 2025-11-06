import { queryKeys } from "@/constants/queryKeys";
import { UseQueryCustomOptions } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getFullCheckSummary } from "../fullCheck";
import { FullCheckSummary } from "@/types/healthNote/fullCheck";

export function useGetFullCheckSummary(petId?: number, queryOptions?: UseQueryCustomOptions<FullCheckSummary>) {
  return useQuery({
    queryFn: () => getFullCheckSummary(petId!),
    queryKey: [
      queryKeys.FULL_CHECK.BASE,
      queryKeys.FULL_CHECK.GET_FULL_CHECK_SUMMARY,
      petId,
    ],
    enabled: !!petId,
    ...queryOptions,
  });
}
