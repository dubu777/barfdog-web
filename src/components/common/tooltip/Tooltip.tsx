import * as styles from './Tooltip.css';
import { ReactNode, useState } from "react";
import InfoFillIcon from "/public/images/icons/info-fill.svg";
import InfoIcon from "/public/images/icons/info.svg";
import CloseIcon from "/public/images/icons/close_small.svg";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";

interface TooltipProps {
	children?: ReactNode;
	trigger?: ReactNode; // tooltip
	position?: 'top' | 'bottom' | 'left' | 'right';
	className?: string;
}

export default function Tooltip({
	children,
	trigger,
	position = 'bottom',
	className,
}: TooltipProps) {
	const [visible, setVisible] = useState(false);

	return (
		<div
			className={styles.wrapper}
			onClick={() => setVisible(!visible)}
		>
			{!trigger
				? (
					<SvgIcon
						src={visible ? InfoFillIcon : InfoIcon}
						size={20}
						color='gray900'
						className={styles.tooltipButton({ isClose: false })}
					/>
				)
				: trigger
			}
			{visible && (
				<div className={`${styles.tooltip} ${styles.position[position]} ${className ?? ''}`}>
					{children}
					<button
						onClick={(e) => {
							e.stopPropagation();
							console.log('visible', visible);
							setVisible(false)
						}}
						className={styles.tooltipButton({ isClose: true })}
					>
						<SvgIcon src={CloseIcon} size={20} color='white' />
					</button>
				</div>
			)}
		</div>
	);
}