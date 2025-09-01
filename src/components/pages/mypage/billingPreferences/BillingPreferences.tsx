import * as styles from './BillingPreferences.css';
import Link from "next/link";
import Text from "@/components/common/text/Text";

const BillingPreferences = () => {
	return (
		<section>
			<article className={styles.billingPreferencesContainer}>
				<div className={styles.billingPreferencesBox}>
					<Text type='title4'>정기결제 수단을 관리해보세요</Text>
					<Text type='caption' color='gray700'>정기 결제 수단과 적립금 자동 사용 여부를 손쉽게 관리해보세요</Text>
				</div>
				<div className={styles.billingLinkBox}>
					<Link href={'/mypage/billing-preferences/payment-method'} className={styles.billingLink}>
						<Text type='label1'>결제수단 관리</Text>
					</Link>
					<Link href={'/mypage/billing-preferences/auto-reward'} className={styles.billingLink}>
						<Text type='label1'>자동적립금  관리</Text>
					</Link>
				</div>
			</article>
		</section>
	);
};

export default BillingPreferences;