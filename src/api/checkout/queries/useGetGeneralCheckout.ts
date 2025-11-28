import { useQuery } from "@tanstack/react-query";
import { getGeneralCheckout } from "../checkout";
import {
  GeneralOrderSheetRequest,
  GetGeneralCheckoutResponse,
  UseQueryCustomOptions,
} from "@/types";
import { queryKeys } from "@/constants";

export function useGetGeneralCheckout(
  body: GeneralOrderSheetRequest,
  queryOptions?: UseQueryCustomOptions<GetGeneralCheckoutResponse>
) {
  return useQuery({
    queryKey: [
      queryKeys.CHECKOUT.BASE,
      queryKeys.CHECKOUT.GET_GENERAL_CHECKOUT_SHEET,
      body,
    ],
    queryFn: () => getGeneralCheckout(body),
    ...queryOptions,
  });
}
