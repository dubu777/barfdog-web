import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { ApiResponse, UseQueryCustomOptions } from "@/types";
import { checkProbiomeKit } from "../probiome";
import { ProbiomeKit } from "@/types/healthNote/probiome";

export function useCheckProbiomeKit(
  serialNo: string,
  queryOptions?: UseQueryCustomOptions<ApiResponse<ProbiomeKit>>
) {
  return useQuery({
    queryFn: async () => await checkProbiomeKit(serialNo),
    queryKey: [
      queryKeys.PROBIOME.BASE,
      queryKeys.PROBIOME.CHECK_PROBIOME_KIT,
      serialNo,
    ],
    ...queryOptions,
  });
}
