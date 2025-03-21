'use client';
import * as styles from './DelayShipping.css';
import { useGetSubscriptionDetail } from "@/api/subscription/queries/useGetSubscriptionDetail";
import { pointColor } from "@/styles/common.css";
import { getProductionDates } from "@/utils";
import DefaultText from "@/components/common/defaultText/DefaultText";
import DelayWeekPicker from "@/components/pages/mypage/subscription/delayShipping/delayWeekPicker/DelayWeekPicker";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import InfoBox from "@/components/common/infoBox/InfoBox";
import {usePathname, useSearchParams} from "next/navigation";
import {useDynamicQueryPush} from "@/hooks/useDynamicQueryPush";

const DelayShipping = ({ subscriptionId }: { subscriptionId: number }) => {
	const { data: detail } = useGetSubscriptionDetail(subscriptionId);
	const defaultProductionDates = getProductionDates(detail.nextDeliveryDate);
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const { pushWithQuery } = useDynamicQueryPush();
	const completedMode = searchParams.get('status') === 'completed';
	
	const handleSubmit = () => {
		// 성공시 미루기 완료 페이지 redirection 필요 및 userShippingBox 컴포넌트 분리 후 적용 필요
		pushWithQuery(pathname, { status: 'completed' });
	}

	return (
		<section className={styles.delayShippingContainer}>
			{!completedMode ?
			<>
				<article className={styles.userShippingBox}>
					<div className={styles.userShippingText}>
						<DefaultText type='title4'>최대 8주까지 미룰 수 있어요</DefaultText>
						<DefaultText type='label4' color='gray600' className={styles.dogName}>
							{detail.dogName}의<br/>
							<span className={pointColor}>정기배송 {detail.subscribeCount + 1}회차 신규 도착 예정일</span>을 변경하시겠어요?
						</DefaultText>
					</div>
					<div className={styles.userShippingDate}>
						<div className={styles.dateBox}>
							<DefaultText type='caption' color='gray500'>기존 도착 예정일</DefaultText>
							<DefaultText type='label1'>{defaultProductionDates.receivingDate} (수)</DefaultText>
						</div>
						<div className={styles.dateBox}>
							<DefaultText type='caption' color='gray500'>신규 도착 예정일</DefaultText>
							<DefaultText type='label1' color='red'>신규 도착 예정일</DefaultText>
						</div>
					</div>
				</article>
				<article className={styles.selectShippingBox}>
					<DefaultText type='headline2' className={styles.selectShippingText}>발송 희망 주차를 선택해주세요</DefaultText>
					<DelayWeekPicker onChange={(value) => console.log(value)} isFixedOpen />
				</article>
				<article className={styles.shippingInfoBox}>
					<InfoBox
						color='red'
						text={
						`	'배송 희망일' 변경 시, 선택한 주차를 기준으로 전체 남은 회차의 배송 일정이 변경됩니다.
							'배송 주기'의 변경을 희망하는 경우 ‘식단 변경’ 페이지를 이용해주세요.
							'배송 희망일'이 공휴일과 겹쳤을 시 다음 영업일에 발송이 진행됩니다.`
						}
					/>
				</article>
				<ButtonDocked
					type='full-button'
					primaryButtonLabel='변경완료'
					onPrimaryClick={handleSubmit}
				/>
			</>
				: <div>배송미루기 성공 페이지</div>
			}
		</section>
	);
};

export default DelayShipping;