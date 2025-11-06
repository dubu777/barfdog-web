import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { UseQueryCustomOptions } from "@/types";
import { getAddressList } from "../address";
import { AddressResponse } from "@/types/delivery";

export function useGetAddressList(
  queryOptions?: UseQueryCustomOptions<AddressResponse[]>
) {
  return useQuery({
    queryFn: getAddressList,
    queryKey: [queryKeys.DELIVERY.BASE, queryKeys.DELIVERY.GET_ADDRESS_LIST],
    ...queryOptions,
  });
}
