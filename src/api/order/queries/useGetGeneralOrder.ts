import {
  QueryClient,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { getGeneralOrder } from "../order";
import { GeneralOrderSheetRequest, UseMutationCustomOptions } from "@/types";
import { ORDER_TYPE } from "@/constants/order";
import { queryKeys } from "@/constants";
import { useOrderStore } from "@/store/order/useOrderStore";
import { useDeliveryStore } from "@/store/order/useDeliveryStore";
import { useRewardStore } from "@/store/order/useRewardStore";

// 캐싱 및 상태 업데이트
export function useGetGeneralOrder(
  mutationOptions?: UseMutationCustomOptions
) {
  const getCacheKey = (variables: GeneralOrderSheetRequest) => [
    queryKeys.ORDER.GET_GENERAL_ORDER,
    variables,
  ];
  const { updateOrderBody } = useOrderStore();
  const { setDeliveryDto, setBackupDeliveryDto, setDeliveryId } = useDeliveryStore();
  const { setUserTotalReward } = useRewardStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: getGeneralOrder,
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
          })),
          deliveryId: null,
          orderPrice: data.orderPrice,
          deliveryPrice: data.deliveryPrice,
        },
        ORDER_TYPE.GENERAL
      );
      setDeliveryDto({
        default: data.defaultAddress.default,
        deliveryId: data.defaultAddress.id,
        deliveryName: data.defaultAddress.deliveryName ?? data.defaultAddress.recipientName,
        recipientName: data.defaultAddress.recipientName,
        phoneNumber: data.defaultAddress.phoneNumber,
        zipcode: data.defaultAddress.zipcode,
        street: data.defaultAddress.street,
        detailAddress: data.defaultAddress.detailAddress,
        request: data.defaultAddress.request,
      });
      setBackupDeliveryDto({
        default: data.defaultAddress.default,
        deliveryId: data.defaultAddress.id,
        deliveryName: data.defaultAddress.deliveryName ?? data.defaultAddress.recipientName,
        recipientName: data.defaultAddress.recipientName,
        phoneNumber: data.defaultAddress.phoneNumber,
        zipcode: data.defaultAddress.zipcode,
        street: data.defaultAddress.street,
        detailAddress: data.defaultAddress.detailAddress,
        request: data.defaultAddress.request,
      });
      setUserTotalReward(data.reward);
      if (data.deliveryAddress && data.deliveryAddress.length > 0) {
        setDeliveryId(data.deliveryAddress[0].id);
      }
    },
    onError: (err) => {
      console.error("err", err);
    },
    ...mutationOptions,
  });
}
// post 요청 캐싱
export function useCachedGeneralOrder(
  variables: GeneralOrderSheetRequest
) {
  const cacheKey = [queryKeys.ORDER.GET_GENERAL_ORDER, variables];
  return useSuspenseQuery({
    queryFn: () => getGeneralOrder(variables),
    queryKey: cacheKey,
  });
}

export async function prefetchGeneralOrder(
  queryClient: QueryClient,
  variables: GeneralOrderSheetRequest
): Promise<void> {
  await queryClient.prefetchQuery({
    queryKey: [queryKeys.ORDER.GET_GENERAL_ORDER, variables],
    queryFn: () => getGeneralOrder(variables),
  });
}