import { ReactNode } from 'react';
import Card from "@/components/common/card/Card";

interface CardSectionProps {
	shadow?: 'strong' | 'none';
	children: ReactNode;
	padding?: 12 | 20;
	className?: string;
	borderRadius?: 'default' | 'none';
}

const CardSection = ({
	children,
	shadow = 'strong',
	padding = 12,
	className,
	borderRadius = 'default',
}: CardSectionProps) => {
	return (
		<Card shadow={shadow} padding={padding} className={className || ''} borderRadius={borderRadius}>
			{children}
		</Card>
	);
};

export default CardSection;