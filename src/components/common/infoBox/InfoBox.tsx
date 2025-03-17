import HelpIcon from '/public/images/icons/help.svg';
import InfoIcon from '/public/images/icons/info.svg';
import ChevronRightIcon from '/public/images/icons/chevron-right.svg';
import DefaultText from "@/components/common/defaultText/DefaultText";
import { themeVars } from "@/styles/theme.css";
import {
	infoBoxBase,
	infoBoxClickEvent,
	infoBoxColor,
	infoBoxStyle,
	infoTextStyle
} from "@/components/common/infoBox/InfoBox.css";

interface InfoBoxProps {
	type?: 'help' | 'info';
	color?: 'red' | 'blue' | 'gray';
	hasChevron?: boolean;
	text: string;
	onClick?: () => void;
	className?: string;
}

const InfoBox = ({
	type = 'info',
	color = 'gray',
	hasChevron = false,
	text,
	className,
	onClick,
}: InfoBoxProps) => {
	const iconColor =
		color === 'gray'
			? themeVars.colors.gray.gray700
			: color === 'red' ? themeVars.colors.red.pastelRed
			: color === 'blue' && themeVars.colors.blue.blue500;

	return (
		<div className={`${infoBoxBase} ${infoBoxColor[color]} ${infoBoxClickEvent[!!onClick]} ${className || ''}`} onClick={onClick || undefined}>
			<div className={infoBoxStyle}>
				{type === 'help' ? <HelpIcon style={{ color: iconColor }} /> : <InfoIcon style={{ color: iconColor }} />}
				<DefaultText type='label4' color={color === 'gray' ? 'gray800' : color} className={infoTextStyle}>{text}</DefaultText>
			</div>
			{hasChevron &&
				<button>
					<ChevronRightIcon />
				</button>
			}
		</div>
	);
};

export default InfoBox;