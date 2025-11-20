import axiosInstance from "@/api/axiosInstance";
import { AxiosInstance } from "axios";
import {
  ItemType,
  SortByType,
  StoreItemDetail,
  StoreItemList,
} from "@/types/store";
import { ApiResponse } from "@/types";
import { validateApiResponse } from "@/utils/api/apiResponseUtils";
import { sendLogToNative } from "@/utils/debug/webviewLogger";

const getStoreItemList = async ({
  pageParam = 0,
  size = 20,
  sortBy = 'recent',
  itemType = 'ALL',
  instance = axiosInstance
}: {
  pageParam: number;
  size?: number;
  sortBy?: SortByType;
  itemType?: ItemType;
  instance?: AxiosInstance;
}) => {
  try {
    const requestParams = {
      page: pageParam,
      size,
      sortBy,
      itemType: itemType.toUpperCase(),
    };

    sendLogToNative('[getStoreItemList] API 요청', {
      url: '/api/v2/public/items',
      params: requestParams
    });

    const { data }: { data: ApiResponse<StoreItemList> } = await instance.get(`/api/v2/public/items`, {
      params: requestParams,
    });

    sendLogToNative('[getStoreItemList] API 응답 수신', {
      itemCount: data?.data?.shopItemList?.length,
      pagination: data?.data?.pagination,
      success: data?.success
    });

    const responseData = validateApiResponse(data, "상품 목록 조회에 실패했습니다.");

    sendLogToNative('[getStoreItemList] validateApiResponse 통과', {
      itemCount: responseData.shopItemList?.length
    });

    return {
      pagination: responseData.pagination,
      itemList: responseData.shopItemList,
    };
  } catch (error: any) {
    sendLogToNative('[getStoreItemList] ❌ 에러 발생', {
      message: error?.message,
      status: error?.response?.status,
      statusText: error?.response?.statusText,
      data: error?.response?.data,
    });
    throw error;
  }
};

const getStoreItemDetail = async (itemId: number, instance: AxiosInstance = axiosInstance): Promise<StoreItemDetail> => {
  const { data }: { data: ApiResponse<StoreItemDetail> } = await instance.get(`/api/v2/public/items/${itemId}`);
  return validateApiResponse(data, "상품 상세 조회에 실패했습니다.");
}

export { 
  getStoreItemList,
  getStoreItemDetail,
};
