import { commonWrapper } from "@/styles/common.css";
import EmptyImage from '/public/images/healthNote/empty.svg';
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import Text from "@/components/common/text/Text";

interface EmptyListProps {
	title: string;
}

export default function EmptyList({ title }: EmptyListProps) {
	return (
		<div className={commonWrapper({ direction: 'col', gap: 12, align: 'center' })}>
			<SvgIcon src={EmptyImage} width={120} height={100} />
			<div className={commonWrapper({ direction: 'col', gap: 6, align: 'center' })}>
				<Text type='title2'>멍...</Text>
				<Text type='body2' color='gray600' align='center' preLine>
					{title}
				</Text>
			</div>
		</div>
	);
}