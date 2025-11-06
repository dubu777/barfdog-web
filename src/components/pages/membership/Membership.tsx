'use client';
import { commonWrapper } from "@/styles/common.css";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/header/Header";
import Text from "@/components/ui/text/Text";
import MembershipCard from "@/components/pages/membership/membershipCard/MembershipCard";
import InfoText from "@/components/ui/typography/infoText/InfoText";
import { MEMBERSHIP_TIERS_LIST } from "@/constants";

export default function Membership() {
	const router = useRouter();

	const noticeList = [
		'멤버십 등급은 매월 1일, 지난달 구매확정된 결제 내역을 기준으로 새롭게 부여돼요.',
		'구매확정이 완료된 결제만 등급에 반영되니 말일 전에 꼭 확정해 주세요.',
		'적립금은 할인 쿠폰 등을 제외한 실제 결제 금액에 적립율을 적용해 지급돼요.',
		'멤버십 등급에 따라 매월 할인 쿠폰이 자동 발급되며 구독과 일반 결제 모두 사용 가능해요. ',
	]

	return (
		<>
		<Header
			showCloseButton
			onClose={() => router.back()}
			centerTitle="멤버십 등급 안내"
		/>
		<section>
			<article
				className={commonWrapper({
					direction: 'col',
					gap: 12,
					padding: 20,
					backgroundColors: 'gray50'
				})}
			>
				{MEMBERSHIP_TIERS_LIST.map(tier => (
					<MembershipCard key={tier.tier} tier={tier} />
				))}
			</article>
			<article
				className={commonWrapper({
					direction: 'col',
					align: 'start',
					gap: 16,
					paddingX: 20,
					paddingTop: 40,
					paddingBottom: 60,
					backgroundColors: 'gray0'
				})}
			>
				<Text type='label3' color='gray800'>[등급 혜택 유의사항]</Text>
				<div
					className={commonWrapper({
						direction: 'col',
						align: 'start',
						gap: 8,
					})}
				>
					{noticeList.map(notice => (
						<InfoText key={notice} text={notice} type='body3' color='gray700' />
					))}
				</div>
			</article>
		</section>
		</>
	);
};