import { ReactNode } from 'react';
import Card from "@/components/common/card/Card";

interface CardSectionProps {
	shadow?: 'strong' | 'none';
	children: ReactNode;
	padding?: 12 | 20;
	className?: string;
	borderRadius?: 8 | 'none';
	align?: 'start' | 'between';
}

const CardSection = ({
	children,
	shadow = 'strong',
	padding = 12,
	className,
	borderRadius = 8,
	align = 'start',
}: CardSectionProps) => {
	return (
		<Card shadow={shadow} padding={padding} align={align} className={className || ''} borderRadius={borderRadius}>
			{children}
		</Card>
	);
};

export default CardSection;