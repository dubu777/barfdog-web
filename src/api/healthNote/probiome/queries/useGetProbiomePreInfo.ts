import { queryKeys } from "@/constants/queryKeys";
import { UseQueryCustomOptions } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getProbiomePreInfo } from "../probiome";
import { ProbiomePreInfo } from "@/types/healthNote/probiome";

export function useGetProbiomePreInfo(
  petId: number,
  serialNo: string,
  queryOptions?: UseQueryCustomOptions<ProbiomePreInfo>
) {
  return useQuery({
    queryFn: () => getProbiomePreInfo(petId, serialNo),
    queryKey: [
      queryKeys.PROBIOME.BASE,
      queryKeys.PROBIOME.GET_PROBIOME_PRE_INFO,
      petId,
    ],
    ...queryOptions,
  });
}
