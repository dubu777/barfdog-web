import { ReactNode } from "react";
import { cardAlign, cardBaseStyle, cardBorderRadius, cardPadding, cardShadow } from "@/components/common/card/Card.css";

interface CardProps {
	shadow: 'light' | 'normal' | 'strong' | 'none';
	padding?: 0 | 12 | 16 | 20;
	align?: 'left' | 'center';
	children: ReactNode;
	className?: string;
	width?: number;
	borderRadius?: 'default' | 'none';
}

const Card = ({
	shadow = 'normal',
	padding = 20,
	align = 'left',
	className,
	children,
	width,
	borderRadius = 'default',
}: CardProps) => {
	return (
		<div
			className={`
				${cardBaseStyle} 
				${cardShadow[shadow]} 
				${cardPadding[padding]} 
				${cardAlign[align]}
				${cardBorderRadius[borderRadius]}
				${className || ''}
			`}
			style={{ width: width || '100%' }}
		>
			{children}
		</div>
	);
};

export default Card;