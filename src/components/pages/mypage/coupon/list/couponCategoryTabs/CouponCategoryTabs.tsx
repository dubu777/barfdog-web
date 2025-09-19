import { commonWrapper } from "@/styles/common.css";
import TabBar from "@/components/common/tabBar/TabBar";
import useFilterTabs from "@/hooks/useFilterTabs";

interface CouponCategoryTabsProps {
  setCouponCode: (couponCode: string) => void;
}

export default function CouponCategoryTabs({ setCouponCode }: CouponCategoryTabsProps) {
  const couponCategoryFilter = [
    { label: '일반 쿠폰', value: 'NON_ALLIANCE' },
    { label: '제휴 쿠폰', value: 'ALLIANCE' },
  ];

  const { defaultTabIndex, handleFilterChange } = useFilterTabs({
    filterKey: 'couponCategory',
    defaultValue: 'NON_ALLIANCE',
    tabs: couponCategoryFilter,
  })
  return (
    <TabBar
      className={commonWrapper({ padding: 20, backgroundColors: 'gray0' })}
      variant='chips'
      tabs={couponCategoryFilter.map(tab => ({
        ...tab,
        onInit: async () => {
          handleFilterChange(tab.value);
          setCouponCode('');
        }
      }))}
      defaultIndex={defaultTabIndex}
      justifyContent='flexStart'
    />
  );
}