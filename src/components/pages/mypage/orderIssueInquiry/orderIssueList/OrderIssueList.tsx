import * as styles from './OrderIssueList.css';
import { usePathname, useSearchParams } from "next/navigation";
import { useDynamicQueryPush } from "@/hooks/useDynamicQueryPush";
import Dropdown from "@/components/common/dropdown/Dropdown";
import OrderIssueCard from "@/components/pages/mypage/layout/cards/section/OrderIssueCard";
import { ORDER_ISSUE_TYPE } from '@/constants/mypage';
import { OrderType } from '@/types';

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
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { pushWithQuery } = useDynamicQueryPush();

	return (
		<article>
			<Dropdown
				label={StatusTypeFilterList[searchParams.get("statusType") as keyof typeof StatusTypeFilterList]?.label || "전체보기"}
				options={Object.entries(StatusTypeFilterList).map(([value, { label }]) => ({label, value}))}
				onSelect={(value) => pushWithQuery(pathname, { statusType: value })}
				className={styles.orderIssueFilter}
			/>
			<div className={styles.orderIssueList}>
				{dummyData.map(data => (
					<OrderIssueCard key={data.id} data={data} issueType={data.issueType as keyof typeof ORDER_ISSUE_TYPE} orderType={data.orderType as OrderType} />
				))}
			</div>
		</article>
	);
};

export default OrderIssueList;