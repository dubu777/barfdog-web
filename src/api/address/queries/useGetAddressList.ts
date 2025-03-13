import { useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { UseSuspenseQueryCustomOptions } from "@/types";
import { getAddressList } from "../address";
import { AddressResponse } from "@/types/delivery";


export function useGetAddressList(queryOptions?: UseSuspenseQueryCustomOptions<AddressResponse[]>) {
  return useSuspenseQuery({
    queryFn: () => getAddressList(),
    queryKey: [queryKeys.DELIVERY.BASE, queryKeys.DELIVERY.GET_ADDRESS_LIST],
    ...queryOptions,
  })
}
