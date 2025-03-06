import { ReactNode } from "react";
import { cardAlign, cardBaseStyle, cardPadding, cardShadow } from "@/components/common/card/Card.css";

interface CardProps {
	shadow: 'light' | 'normal' | 'strong';
	padding?: 12 | 20;
	align?: 'left' | 'center';
	children: ReactNode;
	className?: string;
	width?: number;
}

const Card = ({
	shadow = 'normal',
	padding = 20,
	align = 'left',
	className,
	children,
	width,
}: CardProps) => {
	return (
		<div
			className={`
				${cardBaseStyle} 
				${cardShadow[shadow]} 
				${cardPadding[padding]} 
				${cardAlign[align]}
				${className || ''}
			`}
			style={{ width: width || '100%' }}
		>
			{children}
		</div>
	);
};

export default Card;