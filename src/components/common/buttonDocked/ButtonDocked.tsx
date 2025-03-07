import { ReactNode } from "react";
import {
	buttonStyle,
	containerBaseStyle,
	containerStyle,
} from "./ButtonDocked.css";
import Button from "@/components/common/button/Button";

interface ButtonDockedProps {
	type: 'text-button' | 'full-button' | 'dual-button';
	text?: ReactNode;
	primaryButtonLabel: string;
	secondaryButtonLabel?: string;
	onPrimaryClick: () => void;
	onSecondaryClick?: () => void;
	primaryButtonSize?: 'sm' | 'md' | 'lg';
}

export default function ButtonDocked({
	type,
	text,
	primaryButtonLabel,
	secondaryButtonLabel,
	onPrimaryClick,
	onSecondaryClick,
	primaryButtonSize = 'md',
}: ButtonDockedProps) {
	console.log(primaryButtonSize)

	const primaryButtonStyle =
		type !== 'full-button' && buttonStyle[primaryButtonSize];
	const secondaryButtonStyle =
		type === 'dual-button' && primaryButtonSize === 'lg' ? buttonStyle['sm'] : buttonStyle[primaryButtonSize];
	const textStyle =
		type === 'text-button' && primaryButtonSize === 'sm' ? buttonStyle['lg'] : buttonStyle[primaryButtonSize];

	return (
		<div className={`${containerStyle[type]} ${containerBaseStyle}`}>
			{type === 'text-button' &&
				<div className={textStyle}>
					{text}
				</div>
			}
			{type === 'dual-button' && secondaryButtonLabel &&
				<Button onClick={onSecondaryClick} type='primary' variant='outline' className={secondaryButtonStyle}>
					{secondaryButtonLabel}
				</Button>
			}
			<Button onClick={onPrimaryClick} fullWidth={type === 'full-button'} type='primary' className={primaryButtonStyle}>
				{primaryButtonLabel}
			</Button>
		</div>
	);
}