import { commonWrapper } from "@/styles/common.css";
import TabBar from "@/components/common/tabBar/TabBar";
import useFilterTabs from "@/hooks/useFilterTabs";

export default function RewardFilter() {
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
    <article
      className={commonWrapper({
        padding: 20,
        backgroundColors: 'gray0',
      })}
    >
      <div
        className={commonWrapper({
          justify: 'between',
          gap: 8
        })}
      >
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