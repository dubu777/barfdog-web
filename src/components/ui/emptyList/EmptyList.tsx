import { commonWrapper } from "@/styles/common.css";
import EmptyImage from '/public/images/healthNote/empty.svg';
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";
import Text from "@/components/ui/text/Text";

interface EmptyListProps {
	characterText?: string;
	title: string;
	padding?: '50/0'
}

export default function EmptyList({ 
	characterText = '멍...', 
	title 
}: EmptyListProps) {
	return (
		<div className={commonWrapper({ direction: 'col', gap: 12, align: 'center' })}>
			<SvgIcon src={EmptyImage} width={120} height={100} />
			<div className={commonWrapper({ direction: 'col', gap: 6, align: 'center' })}>
				<Text type='title2'>{characterText}</Text>
				<Text type='body2' color='gray600' align='center' preLine>
					{title}
				</Text>
			</div>
		</div>
	);
}