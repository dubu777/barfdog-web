import { ReactNode } from "react";
import * as styles from './DatePickerButton.css';
import ArrowUpIcon from '/public/images/icons/chevron-sort-up.svg';
import DefaultText from "@/components/common/defaultText/DefaultText";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";

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
				<SvgIcon src={ArrowUpIcon}  style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'all .35s' }} />
			</button>
			{children}
		</div>
	);
}