import * as styles from './ReviewListContainer.css';
import InfiniteScrollTrigger from "@/components/common/infiniteScrollTrigger/InfiniteScrollTrigger";
import { ComponentType, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { ReviewItemType, WritableReviewList, WrittenReviewList } from "@/types";
import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';

interface ReviewListContainerProps<T> {
	reviewItemType: ReviewItemType;
	allReviewItems: boolean;
	useGetReviewList: () => UseInfiniteQueryResult<InfiniteData<WritableReviewList | WrittenReviewList, unknown>, Error>;
	listKey: string;
	ReviewCardComponent: ComponentType<{ review: T }>;
	EmptyStateComponent: ComponentType;
}

const ReviewListContainer = <T extends { id: string; reviewType: ReviewItemType }>({
	reviewItemType,
	allReviewItems,
	useGetReviewList,
	listKey,
	ReviewCardComponent,
	EmptyStateComponent,
}: ReviewListContainerProps<T>) => {
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetReviewList();
	const { ref, inView } = useInView();

	const reviewList: T[] = data?.pages?.flatMap(page => page[listKey] ?? []) ?? [];
	const filteredReviewList = allReviewItems
		? reviewList
		: reviewList.filter(review => review.reviewType === reviewItemType);
	const isEmpty = filteredReviewList.length === 0;

	useEffect(() => {
		if (inView && hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	}, [inView, isFetchingNextPage, hasNextPage, fetchNextPage]);

	
	return (
		<article className={styles.reviewListContainer({ isEmpty })}>
			{isEmpty
				? <EmptyStateComponent />
				: (
					<>
						<ul className={styles.reviewList}>
							{filteredReviewList.map((review, index) => (
								<li key={`${review.id}-${index}`}>
									<ReviewCardComponent review={review}/>
								</li>
							))}
						</ul>
						<InfiniteScrollTrigger
							ref={ref}
							hasNextPage={hasNextPage}
							isFetchingNextPage={isFetchingNextPage}
						/>
					</>
				)
			}
		</article>
	);
};

export default ReviewListContainer;