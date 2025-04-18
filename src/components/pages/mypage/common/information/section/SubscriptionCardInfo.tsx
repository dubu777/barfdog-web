import * as styles from "@/components/pages/mypage/common/information/Information.css";
import { divider } from "@/components/pages/mypage/common/cards/Card.css";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Button from "@/components/common/button/Button";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Divider from "@/components/common/divider/Divider";
import InfoSection from "@/components/pages/mypage/common/information/layout/InfoSection";
import useModal from "@/hooks/useModal";
import PostponeShippingModal from "@/components/pages/mypage/common/modal/postponeShippingModal/PostponeShippingModal";
import { prefetchGetSubscriptionDetail } from "@/api/subscription/queries/useGetSubscriptionDetail";
import { numberOfPacksPerDay, subscriptionPlanInfo } from "@/constants";

interface SubscriptionCardInfoProps {
	subscriptionId: number;
	data: any;
}

const SubscriptionCardInfo = ({
	subscriptionId,
	data,
}: SubscriptionCardInfoProps) => {
	const queryClient = useQueryClient();
	const planInfo = subscriptionPlanInfo[data?.plan];
	const oneMealGramsPerRecipes = data.oneMealGramsPerRecipe.split(',');
	const eachNumberOfPacks = planInfo.totalNumberOfPacks / data.recipeList.length;
	const totalGrams = oneMealGramsPerRecipes.reduce((sum, item) => Number(sum) + Number(item), 0);

	const { isOpen: postponeShippingOpen, onClose: onPostponeShippingClose, onToggle: onPostponeShippingToggle } = useModal();

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
		if (type === 'postponeShipping') {
			await prefetchGetSubscriptionDetail(queryClient, subscriptionId);
			onPostponeShippingToggle();
		} else {
			console.log('changeRecipe!!')
		}
	}

	const recipeList = data.recipeList.map((recipe, index) =>
		({
			...recipe,
			oneMealGramsPerRecipe: Number(oneMealGramsPerRecipes[index]),
			totalNumberOfPacks: eachNumberOfPacks,
			numberOfPacksPerDay: planInfo.numberOfPacksPerDay,
			weeklyPaymentCycle: planInfo.weeklyPaymentCycle,
			perPrice: Math.round((Number(oneMealGramsPerRecipes[index]) / totalGrams) * data.nextPaymentPrice),
		})
	)

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
			</div>
			<div className={styles.infoBoxItemColumn}>
				<DefaultText type="label3" block>구독 상품</DefaultText>
				<ul className={styles.infoBoxItemColumn}>
					{recipeList.map((recipe, index) => (
						<>
						<li key={recipe.id} className={styles.infoBoxItem}>
							<Image src={recipe.imageUrl} alt={recipe.recipeNames} width={88} height={88} style={{ borderRadius: '8px' }} />
							<div className={styles.subscriptionCardInfo}>
								<div>
									<DefaultText type='headline2'>{recipe.recipeNames}</DefaultText>
									<DefaultText type='body3' color='gray600' style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
										{recipe.oneMealGramsPerRecipe}g <span className={divider}/>
										{numberOfPacksPerDay[recipe.numberOfPacksPerDay]}<span className={divider}/>
										{recipe.weeklyPaymentCycle}주<span className={divider}/>
										{recipe.totalNumberOfPacks}팩
									</DefaultText>
								</div>
								<DefaultText type='headline2'>{recipe.perPrice.toLocaleString()}원</DefaultText>
							</div>
						</li>
							{index !== recipeList.length - 1 &&
								<Divider thickness={1} color='gray200' />
							}
						</>
					))}
				</ul>
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
				onClose={onPostponeShippingClose}
			/>
		}
		</>
	);
};

export default SubscriptionCardInfo;