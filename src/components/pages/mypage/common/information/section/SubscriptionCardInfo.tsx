import * as styles from "@/components/pages/mypage/common/information/Information.css";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import Button from "@/components/common/button/Button";
import DefaultText from "@/components/common/defaultText/DefaultText";
import InfoSection from "@/components/pages/mypage/common/information/layout/InfoSection";
import InfoBox from "@/components/common/infoBox/InfoBox";
import RecipeList from "@/components/pages/mypage/common/recipeList/RecipeList";
import PostponeShippingModal from "@/components/pages/mypage/common/modal/postponeShippingModal/PostponeShippingModal";
import useModal from "@/hooks/useModal";
import { subscriptionPlanInfo } from "@/constants";
import { prefetchGetSubscriptionDetail } from "@/api/subscription/queries/useGetSubscriptionDetail";

interface SubscriptionCardInfoProps {
	subscriptionId: number;
	data: any;
}

const SubscriptionCardInfo = ({
	subscriptionId,
	data,
}: SubscriptionCardInfoProps) => {
	const router = useRouter();
	const queryClient = useQueryClient();
	const planInfo = subscriptionPlanInfo[data?.plan];

	const hasPostponeShipping = false;
	const hasChangedRecipe = false;
	const nextCycle = data.subscribeCount + 1;

	const { isOpen: postponeShippingOpen, onClose: onClosePostponeShipping, onToggle: onTogglePostponeShipping } = useModal();

	const subscriptionTopInfo = [
		{ label: '구독 번호', value: data.id },
		{ label: '구독 시작', value: '적용필요' },
		{ label: '배송 주기', value: `${planInfo.weeklyPaymentCycle}주` },
	]

	const buttons = [
		{ label: "배송 미루기", onClick: () => handleActions('postponeShipping') },
		{ label: "구독 정보 변경", onClick: () => handleActions('changeRecipe') },
	]

	const handleActions = async (type: 'postponeShipping' | 'changeRecipe') => {
		await prefetchGetSubscriptionDetail(queryClient, subscriptionId);
		if (type === 'postponeShipping') {
			onTogglePostponeShipping();
		} else {
			router.push(`/mypage/subscription/${subscriptionId}/change-recipe`)
		}
	}

	return (
		<>
		<InfoSection
			title="구독 정보"
			isDefaultOpen
		>
			<div className={`${styles.infoSubTitle} ${styles.infoBox}`}>
				{subscriptionTopInfo.map(info => (
					<div key={info.label} className={styles.infoBoxItem}>
						<DefaultText type="label3">{info.label}</DefaultText>
						<DefaultText type="body3" color='gray700'>{info.value}</DefaultText>
					</div>
				))}
				{(hasPostponeShipping || hasChangedRecipe) &&
					<div className={styles.subscriptionCardNotice}>
						{hasPostponeShipping &&
							<InfoBox text={`${nextCycle}회차부터 배송 미루기가 적용되었어요`} color='blue' />
						}
						{hasChangedRecipe &&
						<InfoBox text={`${nextCycle}회차부터 구독 정보 변경이 적용돼요`} color='blue' />
						}
					</div>
				}
			</div>
			<div className={styles.infoBoxItemColumn}>
				<DefaultText type="label3" block>구독 상품</DefaultText>
				<RecipeList data={data} />
				<div className={styles.infoBoxItem}>
					{buttons.map((btn, index) => (
						<Button key={index} variant="outline" fullWidth size="sm" onClick={btn.onClick}>
							{btn.label}
						</Button>
					))}
				</div>
				<DefaultText type='body3' color='gray600'>・ 진행중 회차에서 생산일인 ‘금요일' 자정 이후에 변경하신 옵션은 다음 회차부터 적용됩니다.</DefaultText>
			</div>
		</InfoSection>
		{postponeShippingOpen &&
			<PostponeShippingModal
				subscriptionId={subscriptionId}
				isOpen={postponeShippingOpen}
				onClose={onClosePostponeShipping}
			/>
		}
		</>
	);
};

export default SubscriptionCardInfo;