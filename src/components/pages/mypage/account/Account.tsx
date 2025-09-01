'use client';
import * as styles from './Account.css';
import Link from "next/link";
import AccountCircle from '/public/images/icons/account_circle.svg';
import Text from "@/components/common/text/Text";
import RecommendationCode from "@/components/pages/mypage/common/recommendationCode/RecommendationCode";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import { useGetMyPageInfo } from "@/api/mypage/common/queries/useGetMypageInfo";

const AccountLinkList = {
	'user-info': { label: '회원정보 변경' },
	'change-password': { label: '비밀번호 변경' },
	'connect-sns': { label: 'SNS 연동정보' },
	'notification': { label: '알림 설정' },
} as const;

// userInfo image 적용 필요
const Account = () => {
	const { data } = useGetMyPageInfo();
	const userData = data?.mypageMemberDto;

	const recommendationCode: string | null = userData?.myRecommendationCode || null;

	return (
		<section className={styles.accountContainer}>
			<article className={styles.accountInfo}>
				<div className={styles.accountImage}>
					<SvgIcon src={AccountCircle} size={80} />
				</div>
				<Text type='title1'>{userData?.memberName} 님</Text>
				<RecommendationCode code={recommendationCode as string} />
			</article>
			<ul className={styles.accountLinkBox}>
				{Object.keys(AccountLinkList).map(key => {
					const typedKey = key as keyof typeof AccountLinkList;
					return (
						<Link href={`/mypage/account/${typedKey}`} key={typedKey}  className={styles.accountLink}>
							<Text type='label1'>
								{AccountLinkList[typedKey].label}
							</Text>
						</Link>
				)
				})}
			</ul>
			<Link href='/mypage/account/withdrawal-account' className={styles.deleteAccountButton}>
				<Text type='label4' color='gray700'>
					회원탈퇴
				</Text>
			</Link>
		</section>
	);
};

export default Account;