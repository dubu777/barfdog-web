import { commonWrapper } from '@/styles/common.css';
import CalendarIcon from "/public/images/icons/calendar.svg";
import Text from "@/components/ui/text/Text";
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";

interface ResultTitleProps {
	title: string;
}

export default function ResultTitle({
	title,
}: ResultTitleProps) {
	return (
		<div className={commonWrapper({ gap: 4 })}>
			<SvgIcon src={CalendarIcon} size={20} />
			<Text type="body3" applyLineHeight={false}>
				{title}
			</Text>
		</div>
	);
}