'use client';
import * as styles from './OrderIssueInquiry.css';
import TabBar from "@/components/common/tabBar/TabBar";
import useFilterTabs from "@/hooks/useFilterTabs";
import BankTransferRefund from "@/components/pages/mypage/orderIssueInquiry/bankTransferRefund/BankTransferRefund";
import OrderIssueList from "@/components/pages/mypage/orderIssueInquiry/orderIssueList/OrderIssueList";

const OrderIssueInquiry = () => {
	const tabs = [
		{
			label: '취소/교환/반품',
			content: <OrderIssueList />
			,
			onInit: () => handleTabInit('issue'),
			value: 'issue'
		},
		{
			label: '무통장 환불',
			content: <BankTransferRefund />
			,
			onInit: () => handleTabInit('bankTransferRefund'),
			value: 'bankTransferRefund'
		},
	]

	const { defaultTabIndex, handleFilterChange } = useFilterTabs({
		filterKey: 'tab',
		defaultValue: 'issue',
		tabs: tabs,
	})

	const handleTabInit = async (value: 'issue' | 'bankTransferRefund') => {
		handleFilterChange(value);
	}

	return (
		<section className={styles.orderIssueInquiryContainer}>
			<TabBar
				hasTabContent
				variant='segmentedButton'
				tabs={tabs}
				defaultIndex={defaultTabIndex}
				className={styles.orderIssueTab}
			/>
		</section>
	);
};

export default OrderIssueInquiry;