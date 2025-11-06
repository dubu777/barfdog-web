import { commonWrapper } from '@/styles/common.css';
import DoubleCoatIcon from '/public/images/healthNote/dogpedia/double_coat.svg';
import SingleCoatIcon from '/public/images/healthNote/dogpedia/single_coat.svg';
import ShortCoatIcon from '/public/images/healthNote/dogpedia/short_coat.svg';
import MiddleCoatIcon from '/public/images/healthNote/dogpedia/middle_coat.svg';
import LongCoatIcon from '/public/images/healthNote/dogpedia/long_coat.svg';
import Text from "@/components/ui/text/Text";
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";
import { FUR_LENGTH, FUR_TYPE } from "@/constants/healthNote/dogpedia";
import { FurLength, FurType } from "@/types/healthNote/dogpedia";

interface CoatQuestionProps {
	label: string;
	furType: FurType;
	furLength: FurLength;
}
export default function CoatQuestion({
	label,
	furType,
	furLength,
}: CoatQuestionProps) {
	const FurTypeIcon = furType === 'DOUBLE_COAT' ? DoubleCoatIcon : SingleCoatIcon;
	const FurLengthIcon =
		furLength === 'SHORT'
		? ShortCoatIcon
		: furLength === 'NORMAL'
			? MiddleCoatIcon
			: LongCoatIcon;

	const coatInfoList = [
		{
			label: '털의 종류',
			value: FUR_TYPE[furType],
			icon: FurTypeIcon,
		},
		{
			label: '털의 길이',
			value: FUR_LENGTH[furLength],
			icon: FurLengthIcon,
		},
	]

	return (
		<div className={commonWrapper({ direction: 'col', gap: 16, align: 'start' })}>
			<Text type='headline2'>{label}</Text>
			<div className={commonWrapper({ justify: 'start', gap: 12 })}>
				{coatInfoList.map(info => (
					<div key={info.label} className={commonWrapper({
						direction: 'col',
						align: 'end',
						justify: 'between',
						gap: 2,
						padding: 8,
						paddingTop: 12,
						paddingBottom: 12,
						backgroundColors: 'gray0',
						borderRadius: 8,
						border: 'gray300',
					})}>
						<div className={commonWrapper({ direction: 'col', gap: 2, align: 'start' })}>
							<Text type='headline4'>{info.label}</Text>
							<Text type='body3' color='gray700'>
								{info.value}
							</Text>
						</div>
						<SvgIcon src={info.icon} size={40} />
					</div>
				))}
			</div>
		</div>
	);
};