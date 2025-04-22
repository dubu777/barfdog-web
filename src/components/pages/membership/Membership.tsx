'use client';
import * as styles from './Membership.css';
import { useBackNavigation } from "@/utils";
import { MEMBERSHIP_TIERS_LIST } from "@/constants/membership";
import MembershipCard from "@/components/pages/membership/membershipCard/MembershipCard";
import Header from "@/components/layout/header/Header";
import InfoText from "@/components/pages/mypage/common/infoText/InfoText";

const Membership = () => {
	const goBack = useBackNavigation();

	const noticeList = [
		'멤버십 등급은 매월 1일, 최근 6개월 실 결제금액을 기준으로 새로운 등급이 부여됩니다.',
		'적립률: 모든 결제에 대해 0.5% 적립',
		'새로운 등급은 구매확정된 최종 결제 건에 한하여 부여됩니다.',
		'예상 등급이란 현재를 기준으로 다음 달 1일 변경 예정인 등급입니다.',
		'‘멤버십 할인 쿠폰’의 경우 매월 등급 기준에 맞춰 정기발행되며, 일반결제 건에 대하여 사용이 가능합니다.',
		'정기 배송을 여러 건 진행하는 경우, 회차가 가장 많이 누적된 ‘진행중 구독’ 건을 기준으로 멤버십이 부여됩니다.',
	]

	return (
		<section className={styles.membershipContainer}>
			<div className={styles.membershipHeader}>
				<Header
					showCloseButton
					onClose={goBack}
					centerTitle="멤버십 등급 안내"
				/>
			</div>
			<article className={styles.membershipList}>
				{MEMBERSHIP_TIERS_LIST.map(tier => (
					<MembershipCard key={tier.tier} tier={tier} />
				))}
			</article>
			<article className={styles.membershipDescription}>
				{noticeList.map(notice => (
					<InfoText key={notice} text={notice} />
				))}
			</article>
		</section>
	);
};

export default Membership;