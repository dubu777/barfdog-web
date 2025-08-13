import * as styles from "./ItemCategoryTab.css";
import { useMemo, useRef, useState } from "react";
import Divider from "@/components/common/divider/Divider";
import TabBar from "@/components/common/tabBar/TabBar";
import ItemDetailLayout from "../../layout/ItemDetailLayout";
import ItemReview from "./itemReview/ItemReview";
import ItemDetail from "./itemDetail/ItemDetail";
import RefundExchangeGuide from "@/components/pages/store/detail/itemCategoryTab/refundExchangeGuide/RefundExchangeGuide";

interface ItemCategory {
  itemId: number;
  reviewCount: number;
  contents: string;
  description: string;
}

interface ItemCategoryTabProps {
  data: ItemCategory;
}

export default function ItemCategoryTab({
  data,
}: ItemCategoryTabProps) {

  const reviewCount = useMemo(() =>
    data.reviewCount > 0
      ? `(${data.reviewCount}${data.reviewCount > 999 ? '+' : ''})`
      : ''
    ,[data.reviewCount])

  const tabs = [
    { 
      label: "상세정보", 
      content: <ItemDetail contents={data.contents} description={data.description} />
    },
    { 
      label: `리뷰 ${reviewCount}`,
      title: `구매 리뷰 ${reviewCount}`,
      content: <ItemReview itemId={data.itemId} /> 
    },
    { 
      label: "반품/교환", 
      content: <RefundExchangeGuide />,
    },
  ];
  const tabContentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabClick = (index: number) => {
  setActiveIndex(index);
  const target = tabContentRefs.current[index];
  if (target) {
    const stickyOffset = 109; // tabBar 높이
    const targetPosition =
      target.getBoundingClientRect().top + window.scrollY - stickyOffset;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  }
};

  return (
    <div className={styles.itemCategoryContainer}>
      <TabBar
        tabs={tabs}
        defaultIndex={activeIndex}
        onTabClick={handleTabClick}
        hasTabContent={false}
        variant="text"
        justifyContent="flexStart"
        className={styles.itemCategoryTab}
      />
      <div>
        {tabs.map((tab, index) => (
          <div 
            key={index}
            ref={(el) => {
              tabContentRefs.current[index] = el;
            }}
          >
            <ItemDetailLayout
              title={tab.label !== '반품/교환' && (tab.title ?? tab.label)}
            >
              {tab.content}
            </ItemDetailLayout>
            {index !== tabs.length - 1 && 
              <Divider thickness={8} color='gray100' />
            }
          </div>
        ))}
      </div>
    </div>
  );
}