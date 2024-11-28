'use client';
import * as styles from "./OrderHistoryFilter.css";
import { useState } from "react";
import { usePathname } from "next/navigation";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import useDynamicQueryPush from "@/hooks/useDynamicQueryPush";
import { DefaultObjectType } from "@/types/common";

const durationFilter: DefaultObjectType[] = [
  {
    name: '1개월',
    value: 1,
    id: 1,
  },
  {
    name: '3개월',
    value: 3,
    id: 3,
  },
  {
    name: '6개월',
    value: 6,
    id: 6,
  },
  {
    name: '1년',
    value: 12,
    id: 12,
  },
  {
    name: '2년',
    value: 24,
    id: 24,
  },
]
const OrderHistoryFilter = () => {
  const pathname = usePathname();
  const { pushWithQuery } = useDynamicQueryPush();
  const [selectedDuration, setSelectedDuration] = useState<number>(1)
  const handleDurationFilterChange = (value: number) => {
    pushWithQuery(pathname, { duration: value });
    setSelectedDuration(value)
  }
  return (
    <article className={styles.filterContainer}>
      {durationFilter.map(filter => (
        <DefaultButton
          key={filter.id}
          type='grayBorder'
          borderRadius='sm'
          size='sm'
          isActive={selectedDuration === filter.value}
          onClick={() => handleDurationFilterChange(Number(filter.value))}
        >
          {filter.name}
        </DefaultButton>
      ))}
    </article>
  );
};

export default OrderHistoryFilter;