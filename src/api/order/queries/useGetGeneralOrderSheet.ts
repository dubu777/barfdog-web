import {
  QueryClient,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { getGeneralOrderSheet } from "../order";
import { GeneralOrderSheetRequest, UseMutationCustomOptions } from "@/types";
import { ORDER_TYPE } from "@/constants/order";
import { queryKeys } from "@/constants";
import { useOrderStore } from "@/store/order/useOrderStore";
import { useDeliveryStore } from "@/store/order/useDeliveryStore";
import { useRewardStore } from "@/store/order/useRewardStore";

// 캐싱 및 상태 업데이트
export function useGetGeneralOrderSheet(
  mutationOptions?: UseMutationCustomOptions
) {
  const getCacheKey = (variables: GeneralOrderSheetRequest) => [
    queryKeys.ORDER.GET_GENERAL_ORDER_SHEET,
    variables,
  ];
  const { updateOrderBody } = useOrderStore();
  const { setDeliveryDto, setDeliveryId } = useDeliveryStore();
  const { setUserTotalReward } = useRewardStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: getGeneralOrderSheet,
    onSuccess: (data, variables) => {
      // 캐싱
      const cacheKey = getCacheKey(variables);
      queryClient.setQueryData(cacheKey, data);
      // 초기 상태 업데이트
      updateOrderBody(
        {
          orderItemDtoList: data.orderItemDtoList.map((item) => ({
            itemId: item.itemId,
            amount: item.amount,
            selectOptionDtoList: (item.optionDtoList ?? []).map((option) => ({
              itemOptionId: option.optionId,
              amount: option.amount,
            })),
            memberCouponId: null,
            discountAmount: 0,
            finalPrice: item.orderLinePrice,
          })),
          deliveryDto: {
            name: data.name,
            phone: data.phoneNumber,
            zipcode: data.defaultAddress.zipcode,
            street: data.defaultAddress.street,
            detailAddress: data.defaultAddress.detailAddress,
            request: "",
          },
          deliveryId: data.deliveryId,
          orderPrice: data.orderPrice,
          deliveryPrice: data.deliveryPrice,
          discountTotal: 0,
          discountReward: 0,
          discountCoupon: 0,
          overDiscount: 0,
          paymentPrice: data.orderPrice,
          brochure: data.brochure,
        },
        ORDER_TYPE.GENERAL
      );
      setDeliveryId(null);
      setDeliveryDto({
        name: data.name,
        phone: data.phoneNumber,
        zipcode: data.defaultAddress.zipcode,
        street: data.defaultAddress.street,
        detailAddress: data.defaultAddress.detailAddress,
        request: "",
      });
      setUserTotalReward(data.reward);
    },
    onError: (err) => {
      console.log("err", err);
    },
    ...mutationOptions,
  });
}
// post 요청 캐싱
export function useCachedGeneralOrderSheet(
  variables: GeneralOrderSheetRequest
) {
  const cacheKey = [queryKeys.ORDER.GET_GENERAL_ORDER_SHEET, variables];
  return useSuspenseQuery({
    queryFn: () => getGeneralOrderSheet(variables),
    queryKey: cacheKey,
  });
}
