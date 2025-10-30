import { commonWrapper } from "@/styles/common.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AccordionIcon from '/public/images/icons/chevron-right-blue.svg';
import SurveyImage from '/public/images/healthNote/full-check/diet-analysis-survey.png'
import Text from "@/components/ui/text/Text";
import Button from "@/components/ui/button/Button";
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";

interface DietAnalysisSurveyProps {
	title: string;
}
export default function DietAnalysisSurvey({
	title,
}: DietAnalysisSurveyProps) {
	const router = useRouter();
	return (
		<article className={commonWrapper({ direction: 'col', gap: 20, align: 'center' })}>
			<span />
			<div className={commonWrapper({ direction: 'col', gap: 4, align: 'center' })}>
				<Text type='title3' align='center' preLine>
					{title}
				</Text>
				<Text type='body3' color='gray600' align='center'>
					AI를 통해 활동량과 나이, 몸무게, 알러지,<br/>건강 고민에 따른 맞춤 식단을 추천해 드려요
				</Text>
			</div>
			<Image src={SurveyImage} alt='survey image' width={335} height={240} />
			<Button onClick={() => router.push('/diet-analysis')} variant='solid' fullWidth>
				식단 추천 받으러 가기
				<SvgIcon src={AccordionIcon} color='white' />
			</Button>
			<span />
		</article>
	);
};