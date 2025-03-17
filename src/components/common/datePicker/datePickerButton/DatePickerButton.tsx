import { ReactNode } from "react";
import * as styles from './DatePickerButton.css';
import DefaultText from "@/components/common/defaultText/DefaultText";
import ArrowUp from '/public/images/icons/chevron-sort-up.svg';

interface DatePickerButtonProps {
	isOpen: boolean;
	onToggle?: () => void;
	value: string;
	children?: ReactNode;
	isMobile?: boolean;
}

export default function DatePickerButton({
	isOpen,
	onToggle,
	value,
	children,
	isMobile = false,
}: DatePickerButtonProps) {
	return (
		<div className={styles.datePickerButtonBox({ isOpen, isMobile })}>
			<button
				onClick={(e) => {
					e.preventDefault();
					if (onToggle) {
						onToggle();
					}
				}}
				className={styles.datePickerButton({ isOpen })}
			>
				<DefaultText type='body2' align='left' color={isOpen ? 'blue' : 'gray800'}>
					{String(value)}
				</DefaultText>
				<ArrowUp style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'all .35s' }} />
			</button>
			{children}
		</div>
	);
}