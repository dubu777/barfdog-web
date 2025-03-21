import HelpIcon from '/public/images/icons/help.svg';
import InfoIcon from '/public/images/icons/info.svg';
import ArrowRightIcon from '/public/images/icons/chevron-right-blue.svg';
import DefaultText from "@/components/common/defaultText/DefaultText";
import { themeVars } from "@/styles/theme.css";
import {
	infoBoxBase,
	infoBoxClickEvent,
	infoBoxColor,
	infoBoxStyle,
	infoTextStyle
} from "@/components/common/infoBox/InfoBox.css";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";

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

	const infoBoxClickEventStyle = onClick !== undefined ? infoBoxClickEvent.true : infoBoxClickEvent.false;

	return (
		<div className={`${infoBoxBase} ${infoBoxColor[color]} ${infoBoxClickEventStyle} ${className || ''}`} onClick={onClick || undefined}>
			<div className={infoBoxStyle}>
				<SvgIcon src={type === 'help' ? HelpIcon : InfoIcon} style={{ color: iconColor }} />
				<DefaultText type='label4' color={color === 'gray' ? 'gray800' : color} className={infoTextStyle}>{text}</DefaultText>
			</div>
			{hasChevron &&
				<button>
					<SvgIcon src={ArrowRightIcon} color={color} />
				</button>
			}
		</div>
	);
};

export default InfoBox;