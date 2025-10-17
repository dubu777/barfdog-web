'use client';
import * as styles from './ItemFilter.css';
import { usePathname, useSearchParams } from "next/navigation";
import Text from "@/components/common/text/Text";
import Dropdown from "@/components/common/dropdown/Dropdown";
import { useDynamicQueryPush } from "@/hooks/useDynamicQueryPush";
import { ITEM_FILTER_CATEGORY, ITEM_SORT_BY } from "@/constants/store";
import { QueryParams } from '@/types';
import { ItemType, SortByType } from "@/types/store";

export default function ItemFilter() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { pushWithQuery } = useDynamicQueryPush();

  const selectedItemType = searchParams.get('itemType') || 'ALL';
  const itemFilterCategoryList = Object.entries(ITEM_FILTER_CATEGORY).map(([value, label]) => ({ value, label }));

  const selectedSortBy = searchParams.get('sortBy') || 'recent';
  const itemSortByList = Object.entries(ITEM_SORT_BY).map(([value, label]) => ({ value, label }));

  const handleFilterChange = async (type: 'sortBy' | 'itemType', filterValue: SortByType | ItemType) => {
    pushWithQuery(pathname, {
      [type]: type === 'sortBy'
        ? filterValue as SortByType
        : filterValue as ItemType,
    } as QueryParams);
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
              <Text type='label1' color={active ? 'red' : 'gray300'}>
                {category.label}
              </Text>
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