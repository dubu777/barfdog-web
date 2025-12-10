"use client";
import { commonWrapper } from "@/styles/common.css";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import InfiniteScrollTrigger from "@/components/ui/infiniteScrollTrigger/InfiniteScrollTrigger";
import TabBar from "@/components/ui/tabBar/TabBar";
import EmptyState from "@/components/pages/mypage/common/emptyState/EmptyState";
import Divider from "@/components/ui/divider/Divider";
import Text from "@/components/ui/text/Text";
import Tooltip from "@/components/ui/tooltip/Tooltip";
import ReviewCard from "@/components/pages/mypage/review/common/reviewCard/ReviewCard";
import { useDynamicQueryPush } from "@/hooks/useDynamicQueryPush";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useFlattenedInfiniteData } from "@/hooks/useFlattenedInfiniteData";
import { queryKeys } from "@/constants";
import { useReviewStore } from "@/store/mypage/useReviewStore";
import { CreateReviewDetail, ReviewListType } from "@/types";
import { useGetInfiniteMypageReviewList } from "@/api/mypage/review/queries/useGetInfiniteMypageReviewList";

export default function Review() {
  const { pushWithQuery } = useDynamicQueryPush();
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const type = searchParams.get("type") ?? ("writable" as ReviewListType);
  const isWriteableReview = type === "writable";
  const activeIndex = !type || isWriteableReview ? 0 : 1;

  const {
    data: reviewListData,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetInfiniteMypageReviewList(type as ReviewListType);
  const reviewList = useFlattenedInfiniteData(reviewListData, "reviewList");
  const totalCount = reviewListData?.pages[0].pagination.totalCount ?? 0;

  const ref = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const { setCreateReview } = useReviewStore();

  useEffect(() => {
    setCreateReview(null);
  }, []);

  const handleTabClick = async (type: ReviewListType) => {
    pushWithQuery(pathname, { type });
    await queryClient.invalidateQueries({
      queryKey: [
        queryKeys.MYPAGE.BASE,
        queryKeys.MYPAGE.REVIEW.BASE,
        queryKeys.MYPAGE.REVIEW.GET_MYPAGE_REVIEW_LIST,
        type,
      ],
    });
  };

  return (
    <section>
      <Divider height={2} color="gray50" />
      <article
        className={commonWrapper({
          padding: 20,
          backgroundColors: "gray0",
        })}
      >
        <TabBar
          tabs={[
            {
              label: "작성 가능한 리뷰",
              onTabChange: () => handleTabClick("writable"),
            },
            {
              label: "내가 작성한 리뷰",
              onTabChange: () => handleTabClick("written"),
            },
          ]}
          hasTabContent={false}
          variant="segmentedButton"
          defaultIndex={activeIndex}
          fullWidth
        />
      </article>
      <article
        className={commonWrapper({
          align: "center",
          justify: "start",
          gap: 4,
          backgroundColors: "gray0",
        })}
        style={{ padding: "8px 20px" }}
      >
        <Text type="label4" applyLineHeight={false}>
          리뷰
        </Text>
        <Text type="label4" applyLineHeight={false}>
          {totalCount}
        </Text>
        {isWriteableReview && (
          <Tooltip>
            <Text type="caption2" color="white">
              리뷰는 구매확정 후 30일 이내에만 작성 가능해요
            </Text>
          </Tooltip>
        )}
      </article>
      <article
        className={commonWrapper({
          backgroundColors: "gray50",
          paddingBottom: 40,
          direction: "col",
        })}
      >
        {reviewList.length > 0 ? (
          <div
            className={commonWrapper({
              direction: "col",
              gap: 8,
              backgroundColors: "gray50",
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
                displayItemThumbnailUrl={review?.displayItemThumbnailUrl?.url}
                displayImageUrl={review?.displayImageUrl?.url}
                status={review?.status}
                writtenDate={review?.writtenDate}
                orderedDate={review?.orderedDate}
                star={review?.star}
                reviewImageCount={review?.reviewImageCount ?? undefined}
                subscribeCount={review?.subscribeCount}
                contents={review?.contents ?? undefined}
                returnReason={review?.returnReason}
                showDetail
                handleCreate={() =>
                  setCreateReview(review as CreateReviewDetail)
                }
              />
            ))}
            <InfiniteScrollTrigger
              ref={ref}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          </div>
        ) : (
          <EmptyState
            title={`아직 ${
              isWriteableReview ? "작성 가능한" : "작성한"
            } 리뷰가 없어요`}
            subTitle={
              isWriteableReview
                ? "상품을 수령하고 ‘구매확정’하면 리뷰를 남길 수 있어요"
                : `리뷰를 작성하면 다른 보호자님에게 도움이 되고\n적립금 혜택도 받을 수 있어요`
            }
          />
        )}
      </article>
    </section>
  );
}
