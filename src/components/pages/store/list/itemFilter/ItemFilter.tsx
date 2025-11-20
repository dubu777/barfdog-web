"use client";
import { commonWrapper } from "@/styles/common.css";
import { itemType } from "./ItemFilter.css";
import { usePathname, useSearchParams } from "next/navigation";
import Dropdown from "@/components/ui/dropdown/Dropdown";
import { useDynamicQueryPush } from "@/hooks/useDynamicQueryPush";
import { ITEM_FILTER_CATEGORY, ITEM_SORT_BY } from "@/constants/store";
import { QueryParams } from "@/types";
import { ItemType, SortByType } from "@/types/store";
import { sendLogToNative } from "@/utils/debug/webviewLogger";

export default function ItemFilter() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { pushWithQuery } = useDynamicQueryPush();

  const selectedItemType = searchParams.get("itemType") || "ALL";
  const itemFilterCategoryList = Object.entries(ITEM_FILTER_CATEGORY).map(
    ([value, label]) => ({ value, label })
  );

  const selectedSortBy = searchParams.get("sortBy") || "recent";
  const itemSortByList = Object.entries(ITEM_SORT_BY).map(([value, label]) => ({
    value,
    label,
  }));

  const handleFilterChange = async (
    type: "sortBy" | "itemType",
    filterValue: SortByType | ItemType
  ) => {
    sendLogToNative('[ItemFilter] 필터 변경 시도', { type, filterValue, pathname });
    sendLogToNative('[ItemFilter] 현재 searchParams', searchParams.toString());

    pushWithQuery(pathname, {
      [type]:
        type === "sortBy"
          ? (filterValue as SortByType)
          : (filterValue as ItemType),
    } as QueryParams);

    sendLogToNative('[ItemFilter] pushWithQuery 호출 완료');
  };
  return (
    <article>
      <ul
        className={commonWrapper({
          justify: "between",
          backgroundColors: "gray0",
        })}
      >
        {itemFilterCategoryList.map((category) => {
          const active = selectedItemType === category.value;
          return (
            <li
              key={category.value}
              onClick={() =>
                handleFilterChange("itemType", category.value as ItemType)
              }
              className={itemType({ active })}
            >
              {category.label}
            </li>
          );
        })}
      </ul>
      <div
        className={commonWrapper({
          justify: "end",
          paddingX: 20,
          paddingY: 12,
        })}
      >
        <Dropdown
          label={ITEM_SORT_BY[selectedSortBy]}
          options={itemSortByList}
          onSelect={(value) =>
            handleFilterChange("sortBy", value as SortByType)
          }
        />
      </div>
    </article>
  );
}
