import * as styles from './CoatQuestion.css';
import DefaultText from "@/components/common/defaultText/DefaultText";
import DoubleCoatIcon from '/public/images/healthNote/dogpedia/double_coat.svg';
import SingleCoatIcon from '/public/images/healthNote/dogpedia/single_coat.svg';
import ShortCoatIcon from '/public/images/healthNote/dogpedia/short_coat.svg';
import MiddleCoatIcon from '/public/images/healthNote/dogpedia/middle_coat.svg';
import LongCoatIcon from '/public/images/healthNote/dogpedia/long_coat.svg';
import SvgIcon from "@/components/common/svgIcon/SvgIcon";

interface CoatQuestionProps {
	label: string;
	furType: '이중모' | '단일모';
	furLength: '짧은' | '중간' | '긴';
}
const CoatQuestion = ({
	label,
	furType,
	furLength,
}: CoatQuestionProps) => {
	const FurTypeIcon = furType === '이중모' ? DoubleCoatIcon : SingleCoatIcon;
	const FurLengthIcon =
		furLength.includes('짧')
		? ShortCoatIcon
		: furLength.includes('중간')
			? MiddleCoatIcon
			: LongCoatIcon;

	const coatInfoList = [
		{
			label: '털의 종류',
			value: furType,
			icon: FurTypeIcon,
		},
		{
			label: '털의 길이',
			value: furLength,
			icon: FurLengthIcon,
		},
	]

	return (
		<div className={styles.coatQuestionContainer}>
			<DefaultText type='headline2'>{label}</DefaultText>
			<div className={styles.coatQuestionBox}>
				{coatInfoList.map(info => (
					<div key={info.label} className={styles.coatQuestion}>
						<DefaultText type='headline4'>{info.label}</DefaultText>
						<DefaultText type='body3' color='gray700'>
							{info.value}
						</DefaultText>
						<SvgIcon src={info.icon} size={40} className={styles.coatIcon} />
					</div>
				))}
			</div>
		</div>
	);
};

export default CoatQuestion;