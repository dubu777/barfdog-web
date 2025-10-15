import { DiscountType, Pagination } from "@/types";
import { ITEM_FILTER_CATEGORY, ITEM_SORT_BY } from "@/constants/store";

type SortByType = keyof typeof ITEM_SORT_BY;
type ItemType = keyof typeof ITEM_FILTER_CATEGORY;
type ItemTagType = 'BEST' | 'NEW';

interface ItemTag {
  tag: ItemTagType;
  color: string;
}

interface BaseStoreItem {
  id: number;
  name: string;
  itemIcons: ItemTagType;
  itemHealthType: string;
  originalPrice: number;
  salePrice: number;
  inStock: boolean;
  packageType: null | string;
  unit: null | string;
  pricePerUnit: number;
}

interface StoreItemListData extends BaseStoreItem {
  displayThumbnailUrl: {
    url: string;
  };
  star: number;
  reviewCount: number;
  itemType: ItemType;
}

interface StoreItemList {
  shopItemList: StoreItemListData[];
  pagination: Pagination;
}

interface ItemInfo extends BaseStoreItem{
  description: string;
  discountType: DiscountType;
  discountDegree: number;
  remaining: number;
  totalSalesAmount: number;
  contents: string;
  deliveryFree: boolean;
  deleted: boolean;
}

interface DeliveryConditionInfo {
  price: number;
  freeCondition: number;
}

interface ItemOption {
  id: number;
  name: string;
  optionPrice: number;
  remaining: number;
}

interface ItemImage {
  id: number;
  leakedOrder: number;
  displayImageUrl: {
    url: string;
  };
}

interface ItemReview {
  star: number;
  count: number;
}

interface StoreItemDetail {
  itemInfo: ItemInfo;
  freeDeliveryCondition: DeliveryConditionInfo;
  itemOptionList: ItemOption[];
  itemImageList: ItemImage[];
  reviewSummary: ItemReview;
}

export type {
  SortByType,
  ItemType,
  ItemTagType,
  ItemTag,
  StoreItemListData,
  StoreItemList,
  StoreItemDetail,
  DeliveryConditionInfo,
  ItemReview,
  ItemImage,
  ItemOption,
};
