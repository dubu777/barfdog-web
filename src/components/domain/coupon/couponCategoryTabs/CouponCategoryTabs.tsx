import { commonWrapper } from "@/styles/common.css";
import TabBar from "@/components/ui/tabBar/TabBar";
import { CouponCategory } from "@/types";
import { COUPON_CATEGORY_FILTER } from "@/constants/coupon";

interface CouponCategoryTabsProps {
  onChangeCouponCategory?: (couponCategory: CouponCategory) => void;
  chipsActiveColor?: "gray800" | "red";
}

export default function CouponCategoryTabs({ 
  chipsActiveColor = "gray800",
  onChangeCouponCategory,
}: CouponCategoryTabsProps) {

  return (
    <TabBar
      className={commonWrapper({ padding: 20, backgroundColors: 'gray0' })}
      variant='chips'
      tabs={COUPON_CATEGORY_FILTER.map(tab => ({
        ...tab,
        onInit: async () => {
          onChangeCouponCategory?.(tab.value as CouponCategory);
        }
      }))}
      defaultIndex={0}
      justifyContent='flexStart'
      chipsActiveColor={chipsActiveColor}
    />
  );
}