import { useQuery } from "@tanstack/react-query";
import { getGeneralCheckout } from "../checkout";
import {
  GetGeneralCheckoutRequest,
  GetGeneralCheckoutResponse,
  UseQueryCustomOptions,
} from "@/types";
import { queryKeys } from "@/constants";

export function useGetGeneralCheckout(
  body: GetGeneralCheckoutRequest,
  queryOptions?: UseQueryCustomOptions<GetGeneralCheckoutResponse>
) {
  return useQuery({
    queryKey: [
      queryKeys.CHECKOUT.BASE,
      queryKeys.CHECKOUT.GET_GENERAL_CHECKOUT_SHEET,
      body,
    ],
    enabled: body.itemList.length > 0,
    queryFn: () => getGeneralCheckout(body),
    ...queryOptions,
  });
}
