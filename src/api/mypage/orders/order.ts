import axiosInstance from "@/api/axiosInstance";
import { getServerParam } from "@/constants/mypage/orders";

import { 
  OrderType, 
  RawSubscriptionOrder,
  RawGeneralOrder,
  UnifiedOrderData,
  UnifiedOrderListResponse,
  RawGeneralOrderDetail,
  RawSubscriptionOrderDetail,
  OrderDetail,
} from "@/types/mypage/orders";
import { decodeImageFilenameFromUrl } from "@/utils/decodeImageFilenameFromUrl";
import { filterVisibleOrders } from "@/utils/mypage/orders/orderStatusFilter";
import { AxiosInstance } from "axios";

// 구독 리스트
const toUnifiedSubscription = (order: RawSubscriptionOrder) => {
  const { recipeDto, subscribeOrderDto } = order;
  
  return {
    recipeInfo: {
      thumbnailUrl: decodeImageFilenameFromUrl(recipeDto.thumbnailUrl),
      name: recipeDto.recipeName,
    },
    orderInfo: {
      ...subscribeOrderDto,
    },
  };
};

// 일반 리스트
const toUnifiedGeneral = (order: RawGeneralOrder) => {
  const { orderDto, itemNameList, thumbnailUrl } = order;
  
  return {
    orderInfo: {
      orderId: orderDto.id,
      merchantUid: orderDto.merchantUid,
      orderDate: orderDto.orderDate,
      paymentPrice: orderDto.paymentPrice,
      orderStatus: orderDto.orderStatus,
      itemNameList: itemNameList,
      thumbnailUrl: decodeImageFilenameFromUrl(thumbnailUrl),
    },
  };
};

// 주문 리스트 조회
const getOrderListByOrderType = async ({
  pageParam = 0,
  size = 10,
  orderType,
  instance = axiosInstance,
}: {
  pageParam: number;
  size?: number;
  orderType: OrderType;
  instance?: AxiosInstance;
}): Promise<UnifiedOrderListResponse> => {

  const serverParam = getServerParam(orderType);
  const endpoint = `/api/orders/${serverParam}`;
  const key = orderType === 'SUBSCRIPTION' ? 'querySubscribeOrdersDtoList' : 'queryGeneralOrdersDtoList';

  const { data } = await instance.get(
    `${endpoint}`, {
      params: {
        page: pageParam,
        size: size,
      },
    }
  );
  
  const rawOrders = data._embedded?.[key] || [];

  // 주문 타입에 따라 적절한 변환 함수를 사용하여 통합된 타입으로 변환
  const convertedOrders = rawOrders.map((order) => {
    return orderType === 'SUBSCRIPTION' 
      ? toUnifiedSubscription(order as RawSubscriptionOrder)
      : toUnifiedGeneral(order as RawGeneralOrder);
  });

  // 노출 가능한 주문 상태만 필터링
  const orders = filterVisibleOrders(convertedOrders) as UnifiedOrderData[];

  return {
    orders,
    pagination: data.page,
  };
};

// 일반 주문 상세
const toUnifiedGeneralDetail = (order: RawGeneralOrderDetail) => {
  const { orderDto, orderItemDtoList, savedRewardTotal } = order;
  
  return {
    orderInfo: { ...orderDto },
    orderItemInfoList: orderItemDtoList.map((item) => ({
      ...item,
      thumbnailUrl: decodeImageFilenameFromUrl(item.thumbnailUrl),
      selectOptionList: item.selectOptionDtoList?.map((option) => ({
        optionName: option.optionName,
        optionAmount: option.optionAmount,
      })) ?? [],
    })),
    savedRewardTotal,
  };
};

// 구독 주문 상세
const toUnifiedSubscriptionDetail = (order: RawSubscriptionOrderDetail) => {
  const { orderDto, recipeDto, recipeNames } = order;
  const { recipientName, recipientPhone, ...commonOrderFields } = orderDto;
  
  return {
    orderInfo: {
      ...commonOrderFields,
      name: recipientName,
      phone: recipientPhone,
    },
    recipeInfo: {
      thumbnailUrl: decodeImageFilenameFromUrl(recipeDto.thumbnailUrl),
      recipeName: recipeDto.recipeName,
      recipeNames,
    },
  };
};

// 주문 상세 조회
const getOrderDetail = async (
  orderId: number,
  type: OrderType,
  instance: AxiosInstance = axiosInstance
): Promise<OrderDetail> => {
  const serverParam = getServerParam(type);
  const { data } = await instance.get(
    `/api/orders/${orderId}/${serverParam}`
  );

  return type === 'SUBSCRIPTION' 
    ? toUnifiedSubscriptionDetail(data) as OrderDetail
    : toUnifiedGeneralDetail(data) as OrderDetail;
};

export { 
  getOrderListByOrderType,
  getOrderDetail, 
};
