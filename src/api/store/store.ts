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
  const { data }: { data: ApiResponse<StoreItemList> } = await instance.get(`/api/v2/public/items`, {
    params: { 
      page: pageParam,
      size,
      sortBy,
      itemType: itemType.toUpperCase(),
    },
  });

  const responseData = validateApiResponse(data, "상품 목록 조회에 실패했습니다.");
  return {
    pagination: responseData.pagination,
    itemList: responseData.shopItemList,
  };
};

const getStoreItemDetail = async (itemId: number, instance: AxiosInstance = axiosInstance): Promise<StoreItemDetail> => {
  const { data }: { data: ApiResponse<StoreItemDetail> } = await instance.get(`/api/v2/public/items/${itemId}`);
  return validateApiResponse(data, "상품 상세 조회에 실패했습니다.");
}

export { 
  getStoreItemList,
  getStoreItemDetail,
};
