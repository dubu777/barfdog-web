import { commonWrapper } from "@/styles/common.css";
import Image from "next/image";
import Text from "@/components/ui/text/Text";
import Card from "@/components/ui/card/Card";
import Divider from "@/components/ui/divider/Divider";
import InfoText from "@/components/ui/typography/infoText/InfoText";
import { MembershipTier } from "@/types/membership";

interface MembershipCardProps {
	tier: MembershipTier;
	className?: string;
}

export default function MembershipCard({ tier, className }: MembershipCardProps) {
	return (
		<Card
			shadow='light'
			key={tier.tier}
			align='start'
			padding={20}
			gap={12}
			className={className || ''}
		>
			<div className={commonWrapper({ gap: 8, align: 'center', justify: 'start' })}>
				<Image src={tier.image} alt={tier.tierKR} width={44} height={44} />
				<Text type='headline1'>{tier.tier}</Text>
			</div>
			<Divider thickness={1} color='gray200' />
			<div className={commonWrapper({ gap: 12, align: 'start', justify: 'start' })}>
				<Text type='headline2' noShrink>기준</Text>
				<Text type='body2' color='gray700'>{tier.condition}</Text>
			</div>
			<div className={commonWrapper({ gap: 12, align: 'start', justify: 'start' })}>
				<Text type='headline2' noShrink>혜택</Text>
				<div className={commonWrapper({ direction: 'col', gap: 6, align: 'start' })}>
					{tier.benefits.map((benefit, index) => (
						<Text key={benefit} type='body2' color='gray700'>
							{benefit}
							{index + 1 === tier.benefits.length &&
								tier.subBenefits &&
									<div className={commonWrapper({ direction: 'col', gap: 8, align: 'start' })}>
										<span />
										{tier.subBenefits.map(benefit => (
											<InfoText key={benefit} text={benefit} type='caption' color='gray500' />
										))}
									</div>
							}
						</Text>
					))}
				</div>
			</div>
		</Card>
	);
};