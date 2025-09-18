import * as styles from '../Card.css';
import Button from "@/components/common/button/Button";
import Text from "@/components/common/text/Text";
import CardSection from "@/components/pages/mypage/common/cards/layout/CardSection";
import CardProductInfo from "@/components/pages/mypage/common/cards/layout/CardProductInfo";
import { ORDER_ISSUE_STATUS, ORDER_ISSUE_TYPE } from "@/constants/mypage/common";
import { MEMBERSHIP_TIERS_LIST } from "@/constants/membership";
import { ORDER_TYPE } from "@/constants";
import { useDynamicQueryPush } from "@/hooks/useDynamicQueryPush";
import { OrderType } from "@/types";
import { useGetMyPageInfo } from "@/api/mypage/common/queries/useGetMypageInfo";

interface OrderIssueCardProps {
	// 마이페이지 취소/교환/반품 내역 데이터 타입 정의 및 적용 필요
	data: any;
	issueType: keyof typeof ORDER_ISSUE_TYPE;
	orderType: OrderType;
	isDetail?: boolean;
}

const OrderIssueCard = ({ data, issueType, orderType, isDetail = false }: OrderIssueCardProps) => {
	const { data: myPageInfoData } = useGetMyPageInfo();
	const memberInfo = myPageInfoData?.memberInfo;

	const { pushWithQuery } = useDynamicQueryPush();
	const cardDetail = data;
	const status = cardDetail?.orderStatus;

	const issueLabel = ORDER_ISSUE_TYPE[issueType] || '';
	const statusLabel = ORDER_ISSUE_STATUS[status];

	const issueStatusLabel = `${issueLabel}${statusLabel}`

	const userMembershipTier = MEMBERSHIP_TIERS_LIST.find(tier => tier.tierKR === memberInfo?.grade);
	const totalDiscount = (userMembershipTier?.subscriptionDiscount || 0) + 5;

	const handleActions = () => {
		pushWithQuery(`/mypage/order-issue-inquiry/${cardDetail.id}`, { issueType: issueType }, ['tab', 'statusType'])
	}
	return (
		<CardSection>
			<Text type='label4'>
				{orderType === ORDER_TYPE.SUBSCRIPTION ? `정기배송 ${cardDetail?.subscribeCount || 0}회차` : '일반배송'} {issueStatusLabel}
				<Text type='caption' color='gray600'>
					&nbsp;&nbsp;신청일 {cardDetail?.requestDate || ''}
				</Text>
			</Text>
			<CardProductInfo
				name={cardDetail?.name || cardDetail?.dogName || cardDetail?.itemName}
				imageUrl={cardDetail?.imageUrl}
				itemName={cardDetail?.recipeNames || cardDetail?.itemName}
				price={cardDetail?.paymentPrice || 1000}
			/>
			<div className={styles.actionsControls({ isWrap: false })}>
				{!isDetail
					? <Button variant='outline' type='assistive' size='sm' fullWidth onClick={handleActions}>
						{issueLabel} 상세보기
					</Button>
					: <Button variant='solid' size='sm' fullWidth onClick={handleActions}>
						{orderType === ORDER_TYPE.SUBSCRIPTION ? `재구독하고 최대 ${totalDiscount}% 할인받기` : '재구매'}
					</Button>
				}
			</div>
		</CardSection>
	);
};

export default OrderIssueCard;