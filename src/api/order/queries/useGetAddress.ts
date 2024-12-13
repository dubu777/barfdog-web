import { useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { AddressResponse, UseSuspenseQueryCustomOptions } from "@/types";
import { getAddress } from "../order";


export function useGetAddress(queryOptions?: UseSuspenseQueryCustomOptions<AddressResponse>) {
  return useSuspenseQuery({
    queryFn: () => getAddress(),
    queryKey: [queryKeys.ORDER, queryKeys.GET_ADDRESS],
    ...queryOptions,
  })
}
