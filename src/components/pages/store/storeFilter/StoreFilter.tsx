'use client';
import * as styles from './StoreFilter.css';
import { usePathname, useSearchParams } from "next/navigation";
import Text from "@/components/common/text/Text";
import SelectBox from "@/components/common/selectBox/SelectBox";
import { itemFilterCategory, itemSortBy } from "@/constants/store";
import { ItemType, SortByType } from "@/types/store";
import useDynamicQueryPush from "@/hooks/useDynamicQueryPush";
import { useQueryClient } from "@tanstack/react-query";
import { prefetchGetStoreItemList } from "@/api/store/queries/useGetStoreItemList";

const StoreFilter = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { pushWithQuery } = useDynamicQueryPush();
  const queryClient = useQueryClient();

  const selectedSortBy = searchParams.get('sortBy') || 'recent';
  const selectedItemType = searchParams.get('itemType') || 'ALL';
  const itemFilterCategoryList = Object.entries(itemFilterCategory).map(([value, label]) => ({ value, label }));
  const itemSortByList = Object.entries(itemSortBy).map(([value, label]) => ({ value, label }));

  const handleFilterChange = async (type: 'sortBy' | 'itemType', filterValue: SortByType | ItemType) => {
    pushWithQuery(pathname, {
      [type]: type === 'sortBy'
        ? filterValue as SortByType
        : filterValue as ItemType,
      page: 1
    });

    if (type === 'sortBy') {
      await prefetchGetStoreItemList(queryClient, 0, filterValue as SortByType, searchParams.get('itemType') as ItemType);
    } else {
      await prefetchGetStoreItemList(queryClient, 0, searchParams.get('sortBy') as SortByType, filterValue as ItemType);
    }
  }
  return (
    <article className={styles.storeFilterContainer}>
      <div className={styles.storeFilterTop}>
        <Text type='title' size='titleXl' weight='bold'>STORE</Text>
        <div className={styles.sortByFilter}>
          <SelectBox
            id="selectedSortBy"
            options={itemSortByList}
            forFilter
            onSelect={(value) => handleFilterChange('sortBy', value as SortByType)}
            selectedValue={selectedSortBy}
          />
      </div>
      </div>
      <ul className={styles.itemTypeFilter}>
        {itemFilterCategoryList.map(category => (
          <li
            key={category.value}
            onClick={() => handleFilterChange('itemType', category.value as ItemType)}
            className={styles.itemType}
          >
            <Text
              type='description'
              size='md'
              color={selectedItemType === category.value ? 'red' : 'black'}
              weight={selectedItemType === category.value ? 'bold' : 'normal'}
              className={styles.itemTypeText}
            >
              {category.label}
            </Text>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default StoreFilter;