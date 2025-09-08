import { commonWrapper } from "@/styles/common.css";
import EmptyImage from '/public/images/healthNote/empty.svg';
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import Text from "@/components/common/text/Text";

export default function EmptyList() {
	return (
		<div className={commonWrapper({ direction: 'col', gap: 12, align: 'center' })}>
			<SvgIcon src={EmptyImage} width={120} height={100} />
			<div className={commonWrapper({ direction: 'col', gap: 6, align: 'center' })}>
				<Text type='title2'>멍...</Text>
				<Text type='body2' color='gray600' align='center'>
					등록된 검사 결과가 없어요<br/>진단 후 결과를 기록해보세요
				</Text>
			</div>
		</div>
	);
}