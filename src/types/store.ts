import {Page, SelectedHealthType} from "@/types";
import {itemFilterCategory, itemSortBy} from "@/constants/store";

export type {
  SortByType,
  ItemType,
  ItemTagType,
  StoreItemListData,
  StoreItemList,
};

// type ItemType = 'ALL' | 'RAW' | 'TOPPING' | 'GOODS';
type SortByType = keyof typeof itemSortBy;
type ItemType = keyof typeof itemFilterCategory;
type ItemTagType = 'BEST' | 'NEW';

interface StoreItemListData {
  id: number;
  thumbnailUrl: string;
  itemIcons: string;
  name: string;
  originalPrice: number;
  salePrice: number;
  inStock : boolean;
  itemHealthType: SelectedHealthType;
  packageType: null | string;
  unit: null | string;
  pricePerUnit: number;
  star: number;
  reviewCount: number;
  thumbnailUrlBase64?: string;
}

interface StoreItemList {
  itemList: StoreItemListData[];
  page: Page;
}