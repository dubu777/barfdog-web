'use client';
import * as styles from './ItemFilter.css';
import { usePathname, useSearchParams } from "next/navigation";
import { ITEM_FILTER_CATEGORY, ITEM_SORT_BY } from "@/constants/store";
import { ItemType, SortByType } from "@/types/store";
import { useDynamicQueryPush } from "@/hooks/useDynamicQueryPush";
import { useQueryClient } from "@tanstack/react-query";
import { prefetchGetStoreItemList } from "@/api/store/queries/useGetStoreItemList";
import { QueryParams } from '@/types';
import DefaultText from "@/components/common/defaultText/DefaultText";
import Dropdown from "@/components/common/dropdown/Dropdown";

const ItemFilter = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { pushWithQuery } = useDynamicQueryPush();
  const queryClient = useQueryClient();

  const selectedItemType = searchParams.get('itemType') || 'ALL';
  const itemFilterCategoryList = Object.entries(ITEM_FILTER_CATEGORY).map(([value, label]) => ({ value, label }));

  const selectedSortBy = searchParams.get('sortBy') || 'recent';
  const itemSortByList = Object.entries(ITEM_SORT_BY).map(([value, label]) => ({ value, label }));

  const handleFilterChange = async (type: 'sortBy' | 'itemType', filterValue: SortByType | ItemType) => {
    pushWithQuery(pathname, {
      [type]: type === 'sortBy'
        ? filterValue as SortByType
        : filterValue as ItemType,
      page: 1
    } as QueryParams);

    if (type === 'sortBy') {
      await prefetchGetStoreItemList(queryClient, 0, filterValue as SortByType, searchParams.get('itemType') as ItemType);
    } else {
      await prefetchGetStoreItemList(queryClient, 0, searchParams.get('sortBy') as SortByType, filterValue as ItemType);
    }
  }
  return (
    <article>
      <ul className={styles.itemTypeFilter}>
        {itemFilterCategoryList.map(category => {
          const active = selectedItemType === category.value;
          return (
            <li
              key={category.value}
              onClick={() => handleFilterChange('itemType', category.value as ItemType)}
              className={styles.itemType({ active })}
            >
              <DefaultText type='label1' color={active ? 'red' : 'gray300'}>
                {category.label}
              </DefaultText>
            </li>
          )
        })}
      </ul>
      <div className={styles.sortByFilter}>
        <Dropdown
          label={ITEM_SORT_BY[selectedSortBy]}
          options={itemSortByList}
          onSelect={(value) => handleFilterChange('sortBy', value as SortByType)}
        />
      </div>
    </article>
  );
};

export default ItemFilter;