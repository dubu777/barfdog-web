import { queryKeys } from "@/constants/queryKeys";
import { UseQueryCustomOptions } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getLatestBodyCheck } from "../bodyCheck";
import { LatestBodyCheck } from "@/types/healthNote/bodyCheck";

export function useGetLatestBodyCheck(petId?: number, queryOptions?: UseQueryCustomOptions<LatestBodyCheck>) {
  return useQuery({
    queryFn: () => getLatestBodyCheck(petId!),
    queryKey: [
      queryKeys.BODY_CHECK.BASE,
      queryKeys.BODY_CHECK.GET_LATEST_BODY_CHECK,
      petId,
    ],
    enabled: !!petId,
    ...queryOptions,
  });
}
