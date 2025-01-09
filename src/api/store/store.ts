import axiosInstance from "@/api/axiosInstance";
import { StoreItemList } from "@/types/store";

export { getStoreItemList };

const getStoreItemList = async (page = 0, size = 10, sortBy = 'recent', itemType = 'ALL'): Promise<StoreItemList> => {
  const { data } = await axiosInstance.get(`/api/items?page=${page}&size=${size}&sortBy=${sortBy}&itemType=${itemType.toUpperCase()}`);

  return {
    page: data.page,
    itemList: data?._embedded?.queryItemsDtoList || [],
  };
};
