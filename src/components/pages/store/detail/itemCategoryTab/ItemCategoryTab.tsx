import * as styles from "./ItemCategoryTab.css";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import Divider from "@/components/common/divider/Divider";
import TabBar from "@/components/common/tabBar/TabBar";
import ItemDetailLayout from "../../layout/ItemDetailLayout";
import ItemReview from "./itemReview/ItemReview";
import RefundExchangeGuide from "@/components/pages/store/detail/itemCategoryTab/refundExchangeGuide/RefundExchangeGuide";
import useStickyTabScroll from "@/hooks/useStickyTabScroll";

const ItemDetail = dynamic(() => import("./itemDetail/ItemDetail"), { ssr: false });

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
  
  const { tabContentRefs, activeIndex, handleTabClick } = useStickyTabScroll({ 
    stickyOffset: 109,
    behavior: 'auto'  
  });

  return (
    <div className={styles.itemCategoryContainer}>
      <TabBar
        tabs={tabs}
        defaultIndex={activeIndex}
        onTabClick={handleTabClick}
        hasTabContent={false}
        variant="text"
        className={styles.itemCategoryTab}
      />
      {tabs.map((tab, index) => (
        <div 
          key={index} 
          ref={(el) => {tabContentRefs.current[index] = el!}}
        >
          <ItemDetailLayout
            title={tab.title ?? tab.label}
          >
            {tab.content}
          </ItemDetailLayout>
          {index !== tabs.length - 1 && 
            <Divider thickness={8} color='gray100' />
          }
        </div>
      ))}
    </div>
  );
}