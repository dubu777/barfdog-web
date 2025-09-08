import { ReactNode } from "react";
import * as styles from './DatePickerButton.css';
import ArrowUpIcon from '/public/images/icons/chevron-sort-up.svg';
import Text from "@/components/common/text/Text";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";

interface DatePickerButtonProps {
	isOpen: boolean;
	onToggle?: () => void;
	value: string;
	children?: ReactNode;
	isMobile?: boolean;
	isDisabled?: boolean;
}

export default function DatePickerButton({
	isOpen,
	onToggle,
	value,
	children,
	isMobile = false,
	isDisabled = false,
}: DatePickerButtonProps) {
	return (
		<div className={styles.datePickerButtonBox({ isOpen, isMobile, isDisabled })}>
			<button
				disabled={isDisabled}
				onClick={(e) => {
					e.preventDefault();
					if (onToggle) {
						onToggle();
					}
				}}
				className={styles.datePickerButton({ isOpen })}
			>
				<Text
					type='body2'
					align='left'
					color={
						isOpen
							? 'blue600'
							: isDisabled
							? 'gray500'
							: 'gray800'
					}
				>
					{String(value)}
				</Text>
				<SvgIcon src={ArrowUpIcon}  style={{ transform: !isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'all .35s' }} />
			</button>
			{children}
		</div>
	);
}