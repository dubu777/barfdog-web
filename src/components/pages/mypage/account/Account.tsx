'use client';
import * as styles from './Account.css';
import Link from "next/link";
import AccountCircle from '/public/images/myPage/account_circle.svg';
import DefaultText from "@/components/common/defaultText/DefaultText";
import { usePersistMypageStore } from "@/store/usePersistMypageStore";
import RecommendationCode from "@/components/pages/mypage/common/recommendationCode/RecommendationCode";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";

const AccountLinkList = {
	'user-info': { label: '회원정보 변경' },
	'change-password': { label: '비밀번호 변경' },
	'connect-sns': { label: 'SNS 연동정보' },
	'notification': { label: '알림 설정' },
} as const;

// userInfo image 적용 필요
const Account = () => {
	const { mypageUserInfo } = usePersistMypageStore();
	const recommendationCode: string | null = mypageUserInfo?.myRecommendationCode || null;

	return (
		<section className={styles.accountContainer}>
			<article className={styles.accountInfo}>
				<div className={styles.accountImage}>
					<SvgIcon src={AccountCircle} size={80} />
				</div>
				<DefaultText type='title1'>{mypageUserInfo?.memberName} 님</DefaultText>
				<RecommendationCode code={recommendationCode as string} />
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
			<Link href='/mypage/account/withdrawal-account' className={styles.deleteAccountButton}>
				<DefaultText type='label4' color='gray700'>
					회원탈퇴
				</DefaultText>
			</Link>
		</section>
	);
};

export default Account;