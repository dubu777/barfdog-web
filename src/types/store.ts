import { BaseReviewItem, Page, ReviewImage, SelectedHealthType } from "@/types";
import { ITEM_FILTER_CATEGORY, ITEM_SORT_BY } from "@/constants/store";

export type {
  SortByType,
  ItemType,
  ItemTagType,
  StoreItemListData,
  StoreItemList,
  StoreItemDetail,
  DetailItemImage,
  DetailItemOption,
  StoreItemDetailReview,
  StoreItemDetailReviewList,
};

type SortByType = keyof typeof ITEM_SORT_BY;
type ItemType = keyof typeof ITEM_FILTER_CATEGORY;
type ItemTagType = 'BEST' | 'NEW';

interface StoreItemBase {
  id: number;
  itemHealthType: SelectedHealthType;
  name: string;
  itemIcons: string;
  packageType: null | string;
  unit: null | string;
  pricePerUnit: number;
  originalPrice: number;
  salePrice: number;
  inStock : boolean;
}

interface StoreItemListData extends StoreItemBase {
  thumbnailUrl: string;
  star: number;
  reviewCount: number;
  thumbnailUrlBase64?: string;
}

interface StoreItemList {
  itemList: StoreItemListData[];
  page: Page;
}

interface DetailItemInfo extends StoreItemBase{
  description: string;
  discountType: string;
  discountDegree: number;
  remaining: number;
  totalSalesAmount: number;
  contents: string;
  deliveryFree: boolean;
  deleted: boolean;
}

interface DetailDeliveryConditionInfo {
  price: number;
  freeCondition: number;
}

interface DetailItemOption {
  id: number;
  name: string;
  optionPrice: number;
  remaining: number;
}

interface DetailItemImage {
  id: number;
  leakedOrder: number;
  filename: string;
  url: string;
}

interface DetailItemReview {
  star: number;
  count: number;
}

interface StoreItemDetail {
  itemDto: DetailItemInfo;
  deliveryCondDto: DetailDeliveryConditionInfo;
  itemOptionDtoList: DetailItemOption[];
  itemImageDtoList: DetailItemImage[];
  reviewDto: DetailItemReview;
}

interface StoreItemReview extends BaseReviewItem {
  createdDate: string;
}

interface StoreItemDetailReview {
  reviewDto: StoreItemReview;
  reviewImageDtoList: ReviewImage[];
}

interface StoreItemDetailReviewList {
  page: Page;
  reviewList: StoreItemDetailReview[]
}