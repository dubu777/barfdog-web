import * as styles from '../MainInformation.css';
import DefaultText from "@/components/common/defaultText/DefaultText";
import { MenuLink, MyPageInfoData, MyPageMemberDto } from "@/types";
import { useRouter } from "next/navigation";

interface MenuListType extends MenuLink {
	key: 'review' | 'coupon' | 'reward';
}

const MENU_LIST: MenuListType[] = [
	{ key: 'review', label: '나의 리뷰', url: '/mypage/review' },
	{ key: 'coupon', label: '쿠폰', url: '/mypage/coupon' },
	{ key: 'reward', label: '적립금', url: '/mypage/reward' },
]

interface UserRewardCardProps {
	myPageData: MyPageInfoData;
	isDisabled?: boolean;
	className?: string;
}

const UserRewardCard = ({ myPageData, isDisabled = false, className }: UserRewardCardProps) => {
	const router = useRouter();
	const userData: MyPageMemberDto = myPageData?.mypageMemberDto ?? { reward: 0 };

	const valueMap: Record<'review' | 'coupon' | 'reward', string | number> = {
		review: 3,
		coupon: myPageData.couponCount ?? 0,
		reward: `${(userData.reward ?? 0).toLocaleString()} P`,
	};

	return (
		<div className={`${styles.userReward} ${className || ''}`}>
		{/*<div className={styles.userReward}>*/}
			{MENU_LIST.map(({ key, label, url }) => (
				<button
					key={key}
					type='button'
					onClick={() => !isDisabled ? router.push(url ?? '/mypage') : undefined}
					className={styles.rewardItem({ isDisabled })}
				>
					<DefaultText type='caption' color='gray600'>{label}</DefaultText>
					<DefaultText type='label2'>{valueMap[key]}</DefaultText>
				</button>
			))}
		</div>
	);
};

export default UserRewardCard;