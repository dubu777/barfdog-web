import * as styles from '../MainInformation.css';
import { Fragment } from "react";
import { useRouter } from "next/navigation";
import ArrowIcon from '/public/images/mypage/chevron-s.svg';
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import Text from "@/components/common/text/Text";
import Divider from "@/components/common/divider/Divider";
import { MenuLink } from "@/types";

interface MenuListType extends MenuLink {
	key: 'review' | 'coupon' | 'reward';
}

const MENU_LIST: MenuListType[] = [
	{ key: 'review', label: '나의 리뷰', url: '/mypage/review' },
	{ key: 'coupon', label: '쿠폰', url: '/mypage/coupon' },
	{ key: 'reward', label: '적립금', url: '/mypage/reward' },
]

interface UserRewardCardProps {
	couponCount: number;
	rewardCount: number;
	reviewCount: number;
	isDisabled?: boolean;
	className?: string;
}

export default function UserRewardCard({
	isDisabled = false,
	className,
	couponCount,
	rewardCount,
	reviewCount = 3,
}: UserRewardCardProps) {
	const router = useRouter();

	const valueMap: Record<'review' | 'coupon' | 'reward', string | number> = {
		review: reviewCount.toLocaleString() ?? 0,
		coupon: couponCount.toLocaleString() ?? 0,
		reward: rewardCount.toLocaleString() ?? 0,
	};

	return (
		<div className={`${styles.userReward} ${className || ''}`}>
			{MENU_LIST.map(({ key, label, url }, index) => (
				<Fragment key={key}>
					<button
						type='button'
						onClick={() => !isDisabled ? router.push(url ?? '/mypage') : undefined}
						className={styles.rewardItem({ isDisabled })}
					>
						<div className={styles.userRewardTitle}>
							<Text type='body3' color='gray600'>{label}</Text>
							<SvgIcon src={ArrowIcon} size={20} color='gray600' />
						</div>
						<Text type='label2'>{valueMap[key]}</Text>
					</button>
					{MENU_LIST.length !== index + 1 &&
						<span className={styles.userRewardLine}>
							<Divider thickness={1} color='gray200' direction='vertical' />
						</span>
					}
				</Fragment>
			))}
		</div>
	);
};