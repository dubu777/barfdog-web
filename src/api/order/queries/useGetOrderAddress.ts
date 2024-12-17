import { useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { AddressResponse, UseSuspenseQueryCustomOptions } from "@/types";
import { getAddress } from "../order";


export function useGetOrderAddress(queryOptions?: UseSuspenseQueryCustomOptions<AddressResponse[]>) {
  return useSuspenseQuery({
    queryFn: () => getAddress(),
    queryKey: [queryKeys.ORDER.BASE, queryKeys.ORDER.GET_ORDER_ADDRESS],
    ...queryOptions,
  })
}
