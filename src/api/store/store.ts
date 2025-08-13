import axiosInstance from "@/api/axiosInstance";
import { AxiosInstance } from "axios";
import {
  StoreItemDetail,
  StoreItemDetailReviewList,
  StoreItemList,
  StoreItemListSearchValues,
} from "@/types/store";

const getStoreItemList = async (page = 0, size = 10, sortBy = 'recent', itemType = 'ALL', instance: AxiosInstance = axiosInstance): Promise<StoreItemList> => {
  const { data } = await instance.get(`/api/items?page=${page}&size=${size}&sortBy=${sortBy}&itemType=${itemType.toUpperCase()}`);

  // return {
  //   page: {
  //     size: data.size,
  //     totalElements: data.totalElements,
  //     totalPages: data.totalPages,
  //     number: data.number,
  //   },
  //   itemList: data?.content || [],
  // };
  return {
    page: data.page,
    itemList: data?._embedded?.queryItemsDtoList || [],
  };
};

const getInfiniteStoreItemList = async ({
  pageParam = 0,
  size = 6,
  sortBy = 'recent',
  itemType = 'ALL',
  instance = axiosInstance
}: StoreItemListSearchValues) => {
  const { data } = await instance.get(`/api/items`, {
    params: { page: pageParam, size, sortBy, itemType },
  });

  const itemList = data?._embedded?.queryItemsDtoList || [];
  const page = data?.page || { number: 0, totalPages: 1 };

  return {
    itemList,
    page,
  }
};

const getStoreItemDetail = async (itemId: number, instance: AxiosInstance = axiosInstance): Promise<StoreItemDetail> => {
  const { data } = await instance.get(`/api/items/${itemId}`);
  return data;
};

const getStoreItemReviewList = async (itemId: number, page = 0, size = 5): Promise<StoreItemDetailReviewList> => {
  const { data } = await axiosInstance.get(`/api/items/${itemId}/reviews?page=${page}&size=${size}`);
  return {
    page: data?.page,
    reviewList: data._embedded.itemReviewsDtoList || [],
  };
}

export { 
  getStoreItemList,
  getInfiniteStoreItemList,
  getStoreItemDetail,
  getStoreItemReviewList,
};
