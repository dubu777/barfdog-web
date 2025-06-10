import * as styles from "./RewardFilter.css";
import TabBar from "@/components/common/tabBar/TabBar";
import useFilterTabs from "@/hooks/useFilterTabs";

const RewardFilter = () => {
  const tabs = [
    { label: '전체', value: 'ALL' },
    { label: '적립', value: 'SAVED' },
    { label: '사용', value: 'USED' },
    { label: '소멸', value: 'EXPIRED' },
  ]

  const { defaultTabIndex, handleFilterChange } = useFilterTabs({
    filterKey: 'status',
    defaultValue: 'ALL',
    tabs: tabs,
  })

  return (
    <article className={styles.rewardFilterContainer}>
      <div className={styles.rewardFilter}>
        <TabBar
          variant='chips'
          tabs={tabs.map(tab => ({
            ...tab,
            onInit: () => handleFilterChange(tab.value)
          }))}
          defaultIndex={defaultTabIndex}
          width={68}
          justifyContent='center'
        />
      </div>
    </article>
  );
};

export default RewardFilter;