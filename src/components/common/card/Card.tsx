import { ReactNode } from "react";
import { cardAlign, cardBaseStyle, cardPadding, cardShadow } from "@/components/common/card/Card.css";

interface CardProps {
	shadow: 'light' | 'normal' | 'strong';
	padding?: 12 | 20;
	align?: 'left' | 'center';
	children: ReactNode;
	className?: string;
}

const Card = ({
	shadow = 'normal',
	padding = 20,
	align = 'left',
	className,
	children
}: CardProps) => {
	return (
		<div className={`
			${cardBaseStyle} 
			${cardShadow[shadow]} 
			${cardPadding[padding]} 
			${cardAlign[align]}
			${className || ''}
		`}>
			{children}
		</div>
	);
};

export default Card;