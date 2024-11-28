'use client';
import * as styles from "./RewardsFilter.css";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { DefaultObjectType } from "@/types/common";
import { RewardFilterType } from "@/types/reward";
import useDynamicQueryPush from "@/hooks/useDynamicQueryPush";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import SelectBox from "@/components/common/selectBox/SelectBox";

const statusFilter: DefaultObjectType[] = [
  {
    name: '전체',
    value: 'ALL' as RewardFilterType,
    id: 'ALL',
  },
  {
    name: '적립',
    value: 'SAVED' as RewardFilterType,
    id: 'SAVED',
  },
  {
    name: '사용',
    value: 'USED' as RewardFilterType,
    id: 'USED',
  },
  {
    name: '소멸',
    value: 'EXPIRED' as RewardFilterType,
    id: 'EXPIRED',
  },
]

const RewardsFilter = ({ totalCount }: { totalCount: number }) => {
  const [isActive, setIsActive] = useState<string>('ALL');
  const [selectedMonth, setSelectedMonth] = useState<string>('3')
  const { pushWithQuery } = useDynamicQueryPush();
  const pathname = usePathname();

  const handleStatusFilterChange = async (status: string) => {
    pushWithQuery(pathname, { status: status })
    setIsActive(status)
  }
  const handleDateFilterChange = async (value: string) => {
    pushWithQuery(pathname, { month: value })
    setSelectedMonth(value)
  }
  return (
    <>
    <article className={styles.rewardFilterContainer}>
      {statusFilter.map(filter => (
        <DefaultButton
          key={filter.id}
          type='grayBorder'
          borderRadius='sm'
          size='sm'
          isActive={isActive === filter.value}
          onClick={() => handleStatusFilterChange(String(filter.value))}
        >
          {filter.name}
        </DefaultButton>
      ))}
    </article>
    <div className={styles.rewardListHeader}>
      <p>총 {totalCount}건</p>
      <div className={styles.selectedMonth}>
        <SelectBox
          id="month"
          options={[{ label: '3개월', value: '3' }, { label: '6개월', value: '6' }, { label: '12개월', value: '12' }]}
          forFilter
          onSelect={(value) => handleDateFilterChange(value)}
          selectedValue={selectedMonth}
        />
      </div>
    </div>
    </>
  );
};

export default RewardsFilter;