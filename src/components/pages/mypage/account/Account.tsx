import * as styles from './Account.css';
import Arrow from '/public/images/icons/pagination-arrow.svg';
import Link from "next/link";

const AccountLinkList = {
	'user-info': { label: '회원 정보 변경' },
	'change-password': { label: '비밀번호 변경' },
	'connected-sns': { label: '연동 SNS' },
} as const;

const Account = () => {
	return (
		<section className={styles.accountContainer}>
			{Object.keys(AccountLinkList).map(key => {
				const typedKey = key as keyof typeof AccountLinkList;
				return (
					<Link href={`/mypage/account/${typedKey}`}  key={typedKey} className={styles.accountLink}>
						{AccountLinkList[typedKey].label}
						<Arrow className={styles.arrowIcon} />
					</Link>
			)
			})}
		</section>
	);
};

export default Account;