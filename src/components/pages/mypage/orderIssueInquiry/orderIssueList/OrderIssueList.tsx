import { useEffect } from "react";
import * as styles from './OrderIssueList.css';
import { usePathname, useSearchParams } from "next/navigation";
import { useDynamicQueryPush } from "@/hooks/useDynamicQueryPush";
import Dropdown from "@/components/common/dropdown/Dropdown";
import OrderIssueCard from "@/components/pages/mypage/common/cards/section/OrderIssueCard";
import { ORDER_ISSUE_TYPE } from '@/constants/mypage/common';
import { ORDER_TYPE } from "@/constants";
import { useMergeOrderList } from "@/api/order/queries/useGetMergeOrderList";
import { useInView } from "react-intersection-observer";
import { OrderType } from "@/types";

const StatusTypeFilterList = {
	'ALL': { label: '전체보기' },
	'CANCEL': { label: '취소상품' },
	'REFUND': { label: '반품상품' },
	'EXCHANGE': { label: '교환상품' },
} as const;

const dummyData = [
	{
		"id": 1,
		"issueType": "CANCEL",
		"requestDate": "2025.01.15",
		"name": "DogName",
		"imageUrl": "https://dev.barfdogserver.com/dog-image.jpg",
		"orderPrice": 272400,
		"orderType": 'subscription',
		"subscribeCount": 3,
	},
	{
		"id": 2,
		"issueType": "REFUND",
		"requestDate": "2025.01.15",
		"name": "ProductName",
		"imageUrl": "https://dev.barfdogserver.com/product1-image.jpg",
		"orderPrice": 272400,
		"orderType": 'general'
	},
	{
		"id": 3,
		"issueType": "EXCHANGE",
		"requestDate": "2025.01.15",
		"name": "ProductName",
		"imageUrl": "https://dev.barfdogserver.com/product2-image.jpg",
		"orderPrice": 272400,
		"orderType": 'general'
	}
]

const OrderIssueList = () => {
	const { ref, inView } = useInView();
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { pushWithQuery } = useDynamicQueryPush();
	const { totalData, loadMore, hasNextPage, isFetchingNextPage } = useMergeOrderList({
		statusFilter: 'CANCEL',
	});
const filteredIssueList = totalData.map(data => {
	if ('recipeDto' in data) {
		// SubscriptionOrderData
		return {
			...data.orderDto,
			id: data.orderDto.orderId || data.orderDto.id,
			orderType: ORDER_TYPE.SUBSCRIPTION,
			issueType: data.orderDto.orderStatus.includes('CANCEL')
				? 'CANCEL'
				: data.orderDto.orderStatus.includes('REFUND')
					? 'REFUND'
					: data.orderDto.orderStatus.includes('EXCHANGE')
						? 'EXCHANGE'
						: null,
			imageUrl: data.recipeDto.thumbnailUrl,
			paymentPrice: data.orderDto.paymentPrice,
			subscribeCount: data.orderDto.subscribeCount || null,
			recipeNames: data.recipeDto.recipeName,
			name: null,
		};
	} else if ('itemNameList' in data) {
		// GeneralOrderData
		return {
			...data.orderDto,
			id: data.orderDto.orderId || data.orderDto.id,
			orderType: ORDER_TYPE.GENERAL,
			issueType: data.orderDto.orderStatus.includes('CANCEL')
				? 'CANCEL'
				: data.orderDto.orderStatus.includes('REFUND')
					? 'REFUND'
					: data.orderDto.orderStatus.includes('EXCHANGE')
						? 'EXCHANGE'
						: null,
			imageUrl: data.thumbnailUrl,
			paymentPrice: data.orderDto.paymentPrice,
			subscribeCount: null,
			recipeNames: null,
			name: data.itemNameList?.[0]?.name || null,
		};
	}

	return null; // 예외 처리
}).filter(Boolean) as NonNullable<typeof filteredIssueList>;

	useEffect(() => {
		if (inView && !isFetchingNextPage && hasNextPage) {
			loadMore();
		}
	}, [inView, isFetchingNextPage, hasNextPage, loadMore])

	return (
		<article>
			<Dropdown
				label={StatusTypeFilterList[searchParams.get("statusType") as keyof typeof StatusTypeFilterList]?.label || "전체보기"}
				options={Object.entries(StatusTypeFilterList).map(([value, { label }]) => ({label, value}))}
				onSelect={(value) => pushWithQuery(pathname, { statusType: value })}
				className={styles.orderIssueFilter}
			/>
			<div className={styles.orderIssueList}>
				{filteredIssueList.map(data => (
					<OrderIssueCard key={data.id} data={data} issueType={data.issueType as keyof typeof ORDER_ISSUE_TYPE} orderType={data.orderType as OrderType} />
				))}
				<div ref={ref} style={{height: 50, background: isFetchingNextPage ? 'lightgray' : 'transparent'}}>
					{isFetchingNextPage ? "Loading more..." : hasNextPage ? "Load more on scroll" : "No more data"}
				</div>
			</div>
		</article>
	);
};

export default OrderIssueList;