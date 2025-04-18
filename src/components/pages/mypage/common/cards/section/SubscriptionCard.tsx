import { useState } from "react";
import DefaultText from "@/components/common/defaultText/DefaultText";
import BaseCard from "@/components/pages/mypage/common/cards/section/BaseCard";
import { useDynamicQueryPush } from "@/hooks/useDynamicQueryPush";
import { getProductionDates } from "@/utils";
import { usePersistMypageStore } from "@/store/usePersistMypageStore";
import { MEMBERSHIP_TIERS_LIST } from "@/constants/membership";
import { SUBSCRIPTION_ORDER_STATUS_LABEL } from "@/constants/mypage";
import { ORDER_TYPE, subscriptionPlanInfo } from "@/constants";
import { CardActionsId, IsOpenCardModal, NormalizedSubscriptionCardData, OrderAction, SubscriptionOrderStatus } from "@/types";
import { getSubscriptionStatusActions } from "@/utils/mypage/getSubscriptionStatusActions";

const normalizeSubscriptionData = (data: any, isMyPage: boolean, subscriptionId?: number): NormalizedSubscriptionCardData => {
	return {
		id: subscriptionId || data.id || data?.subscribeId,
		name: data.name || data.dogName || '이름 없음',
		imageUrl: data.pictureUrl || data?.recipeList?.[0]?.imageUrl || '',
		itemName: data.recipeNames || data?.recipeList?.map(recipe => recipe.recipeNames).join(' ,') || '',
		price: isMyPage ? undefined : data.nextPaymentPrice,
		status: data.status,
		// status: 'CONFIRM',
		// orderStatus: data.orderStatus,
		orderStatus: 'PRODUCING',
		// subscribeCount: data.subscribeCount || 0,
		startDate: data.startDated || '',
		nextPaymentDate: data.nextPaymentDate,
		plan: subscriptionPlanInfo[data.plan],
		orderType: ORDER_TYPE.SUBSCRIPTION,
		// hasPostpone: true,
		hasPostpone: false,
		subscribeCount: data.subscribeCount || 0,
	};
};

const getSubscriptionActionLabel = (label: string, status: string, totalDiscount: number) => {
	if (status === 'SUBSCRIBE_CANCEL') {
		return label.split('-').map((part, i) => (i === 1 ? `${totalDiscount}%${part}` : part)).join('')
	}
	return label;
}

const normalizeActions = (actions: OrderAction[], status: string, totalDiscount: number) => {
	return actions?.map(action => ({
		...action,
		label: getSubscriptionActionLabel(action.label, status, totalDiscount)
	})) || [];
}

interface SubscriptionCardProps {
	data: any;
	type: 'mypage' | 'subscription' | 'subscriptionDetail';
	subscriptionId?: number;
	showBoxShadow?: boolean;
	showActions?: boolean;
	padding?: 12 | 20;
	className?: string;
}

const SubscriptionCard = ({
	data,
	type,
	subscriptionId,
	showBoxShadow = true,
	showActions = true,
	className,
}: SubscriptionCardProps) => {
	const { pushWithQuery } = useDynamicQueryPush();
	const { mypageUserInfo } = usePersistMypageStore();
	const userMembershipTier = MEMBERSHIP_TIERS_LIST.find(tier => tier.tierKR === mypageUserInfo.grade);
	const totalDiscount = (userMembershipTier?.subscriptionDiscount || 0) + 5;

	const isMyPage = type === 'mypage';
	const normalizedData = normalizeSubscriptionData(data, isMyPage, subscriptionId);
	const isSubscriptionCancel = normalizedData.orderStatus === 'SUBSCRIBE_CANCEL';

	console.log(data)

	const productionDates =
		normalizedData.nextPaymentDate
			? getProductionDates(normalizedData.nextPaymentDate, true, 'yyyy.MM.dd')
			: undefined;
	const orderStatusLabel = SUBSCRIPTION_ORDER_STATUS_LABEL[normalizedData.orderStatus as string];

	const actions = getSubscriptionStatusActions(normalizedData.orderStatus as SubscriptionOrderStatus, !!(isMyPage ? normalizedData.hasPostpone : false), type);
	const subscriptionActions = normalizeActions(actions, normalizedData.orderStatus as string, totalDiscount);


	const [isOpenModal, setIsOpenModal] = useState<IsOpenCardModal>({ id: null, isOpen: false });
	const handleActions = (url?: string, params?: string, id?: CardActionsId) => {
		switch (id) {
			case 'confirm': {
				setIsOpenModal({ id, isOpen: true });
				break;
			}
			case 'postponeShipping': {
				setIsOpenModal({ id, isOpen: true, subscriptionId });
				pushWithQuery(`/mypage${url}/${normalizedData.id}${`/${params || ''}`}`, {});
				// console.log('배송미루기')
				break;
			}
			case 'changeRecipe': {
				console.log('식단변경')
				break;
			}
			case 'usingCoupon': {
				console.log('쿠폰사용')
				break;
			}
			case 'deliveryTracking': {
				console.log('배송조회')
				break;
			}
			case 'recipeDetail': {
				console.log('식단 상세')
				break;
			}
			case 'review': {
				console.log('리뷰 작성')
				break;
			}
			case 'changePaymentMethod': {
				console.log('결제 정보 수정')
				break;
			}
			case 'resubscribe': {
				console.log('재구독')
				break;
			}
			case 'subscriptionSchedule': {
				console.log('subscriptionSchedule')
				setIsOpenModal({ id, isOpen: true });
				break;
			}
			default: {
				// 구매확정 bottomSheet 확인 필요
				console.log(id)
				pushWithQuery(`/mypage${url}/${normalizedData.id}${`/${params || ''}`}`, {});
				break;
			}
		}
	};
	return (
		<BaseCard
			type='subscription'
			data={normalizedData}
			cardHeaderTitle={
				<DefaultText type='label4'>
					정기배송 {normalizedData.subscribeCount}회차 {orderStatusLabel}
				</DefaultText>
			}
			cardActions={subscriptionActions}
			showCardActions={showActions}
			handleActions={handleActions}
			showProgressLabel={isMyPage}
			showCardProgressStatus={normalizedData.status === 'SUBSCRIBING'}
			isOpenModal={isOpenModal}
			setIsOpenModal={setIsOpenModal}
			productionDates={productionDates}
			isButtonWrap={!isMyPage}
			showBoxShadow={showBoxShadow}
			className={className}
		/>
	);
};

export default SubscriptionCard;