import axiosInstance from "@/api/axiosInstance";
import {StoreItemDetail, StoreItemDetailReviewList, StoreItemList} from "@/types/store";

export { getStoreItemList, getStoreItemDetail, getStoreItemReviewList };

const getStoreItemList = async (page = 0, size = 10, sortBy = 'recent', itemType = 'ALL'): Promise<StoreItemList> => {
  const { data } = await axiosInstance.get(`/api/items?page=${page}&size=${size}&sortBy=${sortBy}&itemType=${itemType.toUpperCase()}`);

  return {
    page: data.page,
    itemList: data?._embedded?.queryItemsDtoList || [],
  };
};

const getStoreItemDetail = async (itemId: number): Promise<StoreItemDetail> => {
  const { data } = await axiosInstance.get(`/api/items/${itemId}`);
  return data;
};

const getStoreItemReviewList = async (itemId: number, page = 0, size = 6): Promise<StoreItemDetailReviewList> => {
  const { data } = await axiosInstance.get(`/api/items/${itemId}/reviews?page=${page}&size=${size}`);
  return {
    page: data?.page,
    reviewList: data._embedded.itemReviewsDtoList || [],
  };
}