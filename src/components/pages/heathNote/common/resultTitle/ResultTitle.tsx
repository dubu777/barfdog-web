import * as styles from './ResultTitle.css';
import CalendarIcon from "/public/images/icons/calendar.svg";
import DefaultText from "@/components/common/defaultText/DefaultText";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";

interface ResultTitleProps {
	title: string;
}

export default function ResultTitle({
	title,
}: ResultTitleProps) {
	return (
		<div className={styles.resultTitle}>
			<SvgIcon src={CalendarIcon} size={20} />
			<DefaultText type="body3" applyLineHeight={false}>
				{title}
			</DefaultText>
		</div>
	);
}