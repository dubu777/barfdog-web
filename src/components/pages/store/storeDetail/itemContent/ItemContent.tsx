import * as styles from './ItemContent.css';
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { prefetchGetStoreItemReviewList } from "@/api/store/queries/useGetStoreItemReviewList";
import { StoreItemDetail } from "@/types";
import useSanitizedHTML from "@/hooks/useSanitizedHTML";
import { sanitizedHTML } from "@/styles/common.css";
import Tabs from "@/components/common/tabs/Tabs";
import RefundExchangeGuide from "@/components/common/refundExchangeGuide/RefundExchangeGuide";
import ItemReview from "@/components/pages/store/storeDetail/itemContent/itemReview/ItemReview";
import { useDynamicQueryPush } from "@/hooks/useDynamicQueryPush";

interface ItemContentProps {
  itemDetail: StoreItemDetail;
}

const ItemContent = ({ itemDetail }: ItemContentProps) => {
  const queryClient = useQueryClient();
  const { pushWithQuery } = useDynamicQueryPush();

  const pathname = usePathname()
  const params = useParams();
  const searchParams = useSearchParams();
  const itemId = Number(params?.itemId);

  const itemInfo = itemDetail.itemDto;
  const contents = useSanitizedHTML(itemInfo.contents);

  const tab = searchParams.get('tab');
  const defaultTabIndex =
    (!tab || tab === 'content') ? 0
      : tab === 'refundExchange' ? 1
        : tab === 'review' ? 2 : undefined;

  const tabs = [
    {
      label: '상세정보',
      content: (
        <div dangerouslySetInnerHTML={{ __html: contents }} className={`${sanitizedHTML} ${styles.itemContents}`} />
      ),
      onInit: () => handleTabChange('content'),
    },
    {
      label: '반품/교환정보',
      content: <RefundExchangeGuide />,
      onInit: () => handleTabChange('refundExchange'),
    },
    {
      label: '리뷰',
      content: <ItemReview itemId={itemId} />,
      onInit: () => handleTabChange('review'),
    },
  ]

  const handleTabChange = async (type: 'content' | 'refundExchange' | 'review') => {
    pushWithQuery(
      pathname,
      { tab: type, ...(type === 'review' ? { page: 1 } : {}) },
      type !== 'review' ? ['page'] : [],
      true
    );
    if (type === 'review') {
      await prefetchGetStoreItemReviewList(queryClient, itemId, 0);
    }
  }
  return (
    <>
      <Tabs
        tabs={tabs}
        defaultIndex={defaultTabIndex}
        type='button'
      />
    </>
  );
};

export default ItemContent;