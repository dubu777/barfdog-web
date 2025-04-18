import * as styles from './BillingPreferences.css';
import Link from "next/link";
import DefaultText from "@/components/common/defaultText/DefaultText";

const BillingPreferences = () => {
	return (
		<section>
			<article className={styles.billingPreferencesContainer}>
				<div className={styles.billingPreferencesBox}>
					<DefaultText type='title4'>정기결제 수단을 관리해보세요</DefaultText>
					<DefaultText type='caption' color='gray700'>정기 결제 수단과 적립금 자동 사용 여부를 손쉽게 관리해보세요</DefaultText>
				</div>
				<div className={styles.billingLinkBox}>
					<Link href={'/mypage/billing-preferences/payment-method'} className={styles.billingLink}>
						<DefaultText type='label1'>결제수단 관리</DefaultText>
					</Link>
					<Link href={'/mypage/billing-preferences/auto-reward'} className={styles.billingLink}>
						<DefaultText type='label1'>자동적립금  관리</DefaultText>
					</Link>
				</div>
			</article>
		</section>
	);
};

export default BillingPreferences;