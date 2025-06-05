import { ReactNode } from "react";
import {
	cardAlign,
	cardBackgroundStyle,
	cardBaseStyle,
	cardBorderRadius,
	cardPadding,
	cardShadow
} from "@/components/common/card/Card.css";
import {COLORS} from "@/constants/style";

interface CardProps {
	shadow: 'light' | 'normal' | 'strong' | 'none';
	padding?: 0 | 12 | 16 | 20;
	align?: 'left' | 'center';
	children: ReactNode;
	className?: string;
	width?: number;
	borderRadius?: 'default' | 'none';
	background?: keyof typeof COLORS;
}

const Card = ({
	shadow = 'normal',
	padding = 20,
	align = 'left',
	className,
	children,
	width,
	borderRadius = 'default',
	background = 'white',
}: CardProps) => {
	return (
		<div
			className={`
				${cardBaseStyle} 
				${cardBackgroundStyle[background]}
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