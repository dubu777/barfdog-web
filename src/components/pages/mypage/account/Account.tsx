import * as styles from './Account.css';
import Link from "next/link";
import AccountCircle from '/public/images/myPage/account_circle.svg';
import DefaultText from "@/components/common/defaultText/DefaultText";

const AccountLinkList = {
	'user-info': { label: '회원 정보 변경' },
	'change-password': { label: '비밀번호 변경' },
	'connected-sns': { label: '간편 로그인 설정' },
	'notification': { label: '알림 설정' },
} as const;

// userInfo image 적용 필요
const Account = () => {
	return (
		<section className={styles.accountContainer}>
			<article className={styles.accountInfo}>
				<div className={styles.accountImage}>
					<AccountCircle />
				</div>
				<DefaultText type='title1'>홍길동 님</DefaultText>
			</article>
			<ul className={styles.accountLinkBox}>
				{Object.keys(AccountLinkList).map(key => {
					const typedKey = key as keyof typeof AccountLinkList;
					return (
						<Link href={`/mypage/account/${typedKey}`} key={typedKey}  className={styles.accountLink}>
							<DefaultText type='label1'>
								{AccountLinkList[typedKey].label}
							</DefaultText>
						</Link>
				)
				})}
			</ul>
			<button className={styles.deleteAccountButton}>
				<DefaultText type='body2'>
					회원탈퇴
				</DefaultText>
			</button>
		</section>
	);
};

export default Account;