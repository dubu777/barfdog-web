import { useState } from "react";
import * as styles from '../Card.css';
import Button from "@/components/common/button/Button";
import DefaultText from "@/components/common/defaultText/DefaultText";
import CardSection from "@/components/pages/mypage/layout/cards/layout/CardSection";
import CardProductInfo from "@/components/pages/mypage/layout/cards/layout/CardProductInfo";
import CardProgressStatus from "@/components/pages/mypage/layout/cards/layout/CardProgressStatus";
import CardActions from "@/components/pages/mypage/layout/cards/layout/CardActions";
import CardModal from "@/components/pages/mypage/layout/cards/layout/CardModal";
import { useDynamicQueryPush } from "@/hooks/useDynamicQueryPush";
import { getProductionDates } from "@/utils";
import { usePersistMypageStore } from "@/store/usePersistMypageStore";
import { MEMBERSHIP_TIERS_LIST } from "@/constants/membership";
import { ORDER_ACTIONS, SUBSCRIPTION_ORDER_ACTIONS } from "@/constants/mypage";

interface SubscriptionCardProps {
	// 마이페이지 메인 리스트 데이터, 구독 관리 리스트 데이터 타입 정의 및 적용 필요
	data: any;
	type: 'mypage' | 'subscription' | 'subscriptionDetail';
	subscriptionId?: number;
}

const SubscriptionCard = ({ data, type, subscriptionId }: SubscriptionCardProps) => {
	const { mypageUserInfo } = usePersistMypageStore();
	const { pushWithQuery } = useDynamicQueryPush();

	const cardDetail = type === 'subscription' ? data?.subscribeDto : data;
	const isMyPage = type === 'mypage';
	const status: keyof typeof ORDER_ACTIONS | keyof typeof SUBSCRIPTION_ORDER_ACTIONS = 'DELIVERY_DONE';
	const modifiedSubscriptionId = subscriptionId || data?.subscribeId;
	const productionDates =
		cardDetail && typeof cardDetail.nextDeliveryDate === 'string'
			? getProductionDates(cardDetail.nextDeliveryDate) : undefined;

	const userMembershipTier = MEMBERSHIP_TIERS_LIST.find(tier => tier.tierKR === mypageUserInfo.grade);
	const totalDiscount = (userMembershipTier?.subscriptionDiscount || 0) + 5;

	const actions = type === 'mypage' ? ORDER_ACTIONS[status] : SUBSCRIPTION_ORDER_ACTIONS[status];
	const modifiedActions = actions?.map((action) => ({
		...action,
		label: status === 'SUBSCRIBE_CANCEL'
			? action.label.split('-').map((part, i) => (i === 1 ? `${totalDiscount}%${part}` : part)).join('')
			: action.label,
	}));

	const [isOpenModal, setIsOpenModal] = useState<{
		key: 'confirm' | null;
		isOpen: boolean
	}>({
		key: null,
		isOpen: false,
	});

	const handleActions = (url?: string, params?: string, key?: string) => {
		if (!url && key === 'confirm') {
			// 구매확정 버튼 클릭시 OrderBottomSheet -> 현재 주문 관련 데이터 적용으로 확인, 적용 필요
			setIsOpenModal({ key: key, isOpen: true });
		} else {
			pushWithQuery(`/mypage${url}/${modifiedSubscriptionId}${`/${key || ''}`}`, {})
		}
	}
	return (
		<CardSection>
			<DefaultText type='label4'>
				정기배송 {cardDetail.subscribeCount}회차 진행중
				{isMyPage &&
				<DefaultText type='caption' color='gray600'>
					&nbsp;&nbsp;시작일 {cardDetail?.startDated || ''}
				</DefaultText>
				}
			</DefaultText>
			<CardProductInfo
				name={cardDetail.name || cardDetail.dogName}
				imageUrl={cardDetail.pictureUrl}
				itemName={cardDetail.recipeNames}
				imageSize={isMyPage ? 72 : 76}
				price={cardDetail.orderPrice || 1000}
			/>
			<CardProgressStatus
				status={status}
				subscribeCount={cardDetail.subscribeCount}
				isMyPage={isMyPage}
				productionDates={productionDates}
			/>
			<div className={styles.buttonContainer}>
				{!isMyPage &&
				<div className={styles.actionsControls({ isWrap: false })}>
					{/*전체 구독일정 및 신청 정보 확인/변경 url 적용 필요*/}
					<Button variant='outline' type='assistive' size='sm' width='50%' onClick={() => handleActions('/subscription', 'schedule')}>
						전체 구독일정
					</Button>
					{/*전체 구독일정 및 신청 정보 확인/변경 url 적용 필요*/}
					<Button variant='outline' type='assistive' size='sm' width='50%' onClick={() => handleActions('/subscription')}>
						신청 정보 확인/변경
					</Button>
				</div>
				}
				<CardActions
					actions={modifiedActions}
					onActionClick={(url, params , key) => handleActions(url, params, key)}
					status={status}
				/>
			</div>
			<CardModal
				data={cardDetail}
				orderId={modifiedSubscriptionId}
				orderType='subscription'
				modalState={isOpenModal}
				onClose={() => setIsOpenModal({ key: null, isOpen: false })}
			/>
		</CardSection>
	);
};

export default SubscriptionCard;