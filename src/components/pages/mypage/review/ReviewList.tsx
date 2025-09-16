'use client';
import { commonWrapper } from "@/styles/common.css";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useInView } from "react-intersection-observer";
import { useQueryClient } from "@tanstack/react-query";
import InfiniteScrollTrigger from "@/components/common/infiniteScrollTrigger/InfiniteScrollTrigger";
import TabBar from "@/components/common/tabBar/TabBar";
import DefaultEmptyState from "@/components/pages/mypage/common/emptyState/defaultEmptyState/DefaultEmptyState";
import Divider from "@/components/common/divider/Divider";
import Text from "@/components/common/text/Text";
import Tooltip from "@/components/common/tooltip/Tooltip";
import ReviewCard from "@/components/pages/mypage/review/common/reviewCard/ReviewCard";
import { useDynamicQueryPush } from "@/hooks/useDynamicQueryPush";
import { queryKeys } from "@/constants";
import { useReviewStore } from "@/store/mypage/useReviewStore";
import { ReviewListType } from '@/types';
import { useGetMypageReviewList } from "@/api/mypage/review/queries/useGetMypageReviewList";

export default function Review () {
  const { pushWithQuery } = useDynamicQueryPush();
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const type = searchParams.get('type') ?? 'writeable' as ReviewListType;
  const isWriteableReview = type === 'writeable';
  const activeIndex = (!type || isWriteableReview) ? 0 : 1;

  const { data: reviewListData, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetMypageReviewList(type as ReviewListType);
  const reviewList = reviewListData?.pages.flatMap(p => p.reviewList) ?? [];
  const totalCount = reviewListData?.pages[0].page.totalElements ?? 0;

  const { ref, inView } = useInView();

  const { setCreateReview } = useReviewStore();

  useEffect(() => {
    setCreateReview(null);
  }, [])

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage, hasNextPage, fetchNextPage]);

  const handleTabClick = async (type: ReviewListType) => {
    pushWithQuery(pathname, { type });
    await queryClient.invalidateQueries({
      queryKey: [
        queryKeys.MYPAGE.BASE,
        queryKeys.MYPAGE.REVIEW.BASE,
        queryKeys.MYPAGE.REVIEW.GET_MYPAGE_REVIEW_LIST,
        type
      ]
    });
  }

  return (
    <section>
      <Divider thickness={2} color='gray50' />
      <article
        className={commonWrapper({
          padding: 20,
          backgroundColors: 'gray0',
          width: 'full'
        })}
      >
        <TabBar
          tabs={[
            { label: '작성 가능한 리뷰', onInit: () => handleTabClick('writeable') },
            { label: '내가 작성한 리뷰', onInit: () => handleTabClick('written') },
          ]}
          hasTabContent={false}
          variant='segmentedButton'
          defaultIndex={activeIndex}
          className={commonWrapper({ width: 'full' })}
        />
      </article>
      <article
        className={commonWrapper({
          align: 'center',
          justify: 'start',
          gap: 4,
          backgroundColors: 'gray0',
        })}
        style={{ padding: '8px 20px' }}
      >
        <Text type='label4' applyLineHeight={false}>리뷰</Text>
        <Text type='label4' applyLineHeight={false}>{totalCount}</Text>
        {isWriteableReview &&
          <Tooltip>
            <Text type='caption2' color='white'>리뷰는 구매확정 후 30일 이내에만 작성 가능해요</Text>
          </Tooltip>
        }
      </article>
      <article
        className={commonWrapper({
          backgroundColors: 'gray50',
          paddingBottom: 40,
          direction: 'col',
        })}
      >
        {reviewList.length > 0 ?
          <div
            className={commonWrapper({
              direction: 'col',
              gap: 8,
              backgroundColors: 'gray50'
            })}
          >
            <span />
            {reviewList?.map((review) => (
              <ReviewCard
                key={review.id}
                isWriteableReview={isWriteableReview}
                id={review.id}
                title={review.title}
                reviewType={review.reviewType}
                thumbnailUrl={review?.thumbnailUrl}
                imageUrl={review?.imageUrl}
                status={review?.status}
                createdDate={review?.createdDate}
                star={review?.star}
                imageCount={review?.imageCount ?? undefined}
                contents={review?.contents ?? undefined}
                showDetail
                handleCreate={() => setCreateReview(review)}
              />
            ))}
            <InfiniteScrollTrigger
              ref={ref}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          </div>
          : (
            <DefaultEmptyState
              title={`아직 ${isWriteableReview ? '작성 가능한' : '작성한'} 리뷰가 없어요`}
              subTitle={
                isWriteableReview
                  ? '상품을 수령하고 ‘구매확정’하면 리뷰를 남길 수 있어요'
                  : `리뷰를 작성하면 다른 보호자님에게 도움이 되고\n적립금 혜택도 받을 수 있어요`
              }
            />
          )
        }
      </article>
    </section>
  );
};