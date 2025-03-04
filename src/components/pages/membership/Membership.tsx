'use client';
import * as styles from './Membership.css';
import Image from "next/image";
import CloseButton from '/public/images/icons/close.svg';
import DefaultText from "@/components/common/defaultText/DefaultText";
import { useBackNavigation } from "@/utils";
import { MEMBERSHIP_TIERS_LIST } from "@/constants/membership";

const Membership = () => {
	const goBack = useBackNavigation();

	return (
		<section className={styles.membershipContainer}>
			<div className={styles.membershipHeader}>
				<DefaultText type='title4'>멤버십 등급 안내</DefaultText>
				<button onClick={goBack} className={styles.closeButton}>
					<CloseButton />
				</button>
			</div>
			<ul className={styles.membershipList}>
				{MEMBERSHIP_TIERS_LIST.map(tier => (
					<li key={tier.tier} className={styles.membershipItem}>
						<div className={styles.membershipInfo}>
							<div className={styles.membershipName}>
								<Image src={tier.image} alt={tier.tierKR} width={44} height={44} />
								<DefaultText type='headline1'>{tier.tier}</DefaultText>
							</div>
							<DefaultText type='caption' color='gray500' className={styles.membershipCondition}>
								{tier.condition}
							</DefaultText>
						</div>
						<div className={styles.membershipBenefit}>
							<div className={styles.benefitList({ isSub: false })}>
								{tier.benefits.map(benefit => (
									<DefaultText key={benefit} type='label2' color='gray800'>{benefit}</DefaultText>
								))}
							</div>
							{tier.subBenefits &&
								<div className={styles.benefitList({ isSub: true })}>
									{tier.subBenefits.map(benefit => (
										<DefaultText key={benefit} type='caption' color='gray500'>• {benefit}</DefaultText>
									))}
								</div>
							}
						</div>
					</li>
				))}
			</ul>
			<div className={styles.membershipDescription}>
				<DefaultText type='caption' color='gray500'>
					• 멤버십 등급은 매월 1일, 최근 6개월 실 결제금액을 기준으로 새로운 등급이 부여됩니다.
				</DefaultText>
				<DefaultText type='caption' color='gray500'>
					• 적립률: 모든 결제에 대해 0.5% 적립
				</DefaultText>
				<DefaultText type='caption' color='gray500'>
					• 예상 등급이란 현재를 기준으로 다음 달 1일 변경 예정인 등급입니다.
				</DefaultText>
				<DefaultText type='caption' color='gray500'>
					• 새로운 등급은 구매확정된 최종 결제 건에 한하여 부여됩니다.
				</DefaultText>
				<DefaultText type='caption' color='gray500'>
					• ‘멤버십 할인 쿠폰’의 경우 매월 등급 기준에 맞춰 정기발행되며, 일반결제 건에 대하여 사용이 가능합니다.
				</DefaultText>
			</div>
		</section>
	);
};

export default Membership;