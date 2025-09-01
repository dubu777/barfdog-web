import * as styles from '../Membership.css';
import Image from "next/image";
import Text from "@/components/common/text/Text";
import Card from "@/components/common/card/Card";
import { MembershipTier } from "@/types/membership";

interface MembershipCardProps {
	tier: MembershipTier;
	className?: string;
}

const MembershipCard = ({ tier, className }: MembershipCardProps) => {
	return (
		<Card
			shadow='light'
			key={tier.tier}
			align='start'
			padding={20}
			className={className || ''}
		>
			<div className={styles.membershipInfo}>
				<div className={styles.membershipName}>
					<Image src={tier.image} alt={tier.tierKR} width={44} height={44} />
					<Text type='headline1'>{tier.tier}</Text>
				</div>
				<Text type='caption' color='gray500' className={styles.membershipCondition}>
					{tier.condition}
				</Text>
			</div>
			<div className={styles.membershipBenefit}>
				<div className={styles.benefitList({ isSub: false })}>
					{tier.benefits.map(benefit => (
						<Text key={benefit} type='label2' color='gray800'>{benefit}</Text>
					))}
				</div>
				{tier.subBenefits &&
				<div className={styles.benefitList({ isSub: true })}>
					{tier.subBenefits.map(benefit => (
						<Text key={benefit} type='caption' color='gray500'>• {benefit}</Text>
					))}
				</div>
				}
			</div>
		</Card>
	);
};

export default MembershipCard;