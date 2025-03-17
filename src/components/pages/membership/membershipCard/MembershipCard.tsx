import * as styles from '../Membership.css';
import Image from "next/image";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Card from "@/components/common/card/Card";
import { MembershipTier } from "@/types/membership";

interface MembershipCardProps {
	tier: MembershipTier;
	className?: string;
}

const MembershipCard = ({ tier, className }: MembershipCardProps) => {
	return (
		<Card shadow='light' key={tier.tier} className={className || ''}>
			<div className={styles.membershipInfo}>
				<div className={styles.membershipName}>
					<Image src={tier.image} alt={tier.tierKR} width={44} height={44} />
					<DefaultText type='headline1'>{tier.tier}</DefaultText>
				</div>
				<DefaultText type='caption' color='gray500' className={styles.membershipCondition}>
					{tier.condition}
				</DefaultText>
			</div>
			<div className={styles.membershipBenefit}>
				<div className={styles.benefitList({ isSub: false })}>
					{tier.benefits.map(benefit => (
						<DefaultText key={benefit} type='label2' color='gray800'>{benefit}</DefaultText>
					))}
				</div>
				{tier.subBenefits &&
				<div className={styles.benefitList({ isSub: true })}>
					{tier.subBenefits.map(benefit => (
						<DefaultText key={benefit} type='caption' color='gray500'>• {benefit}</DefaultText>
					))}
				</div>
				}
			</div>
		</Card>
	);
};

export default MembershipCard;