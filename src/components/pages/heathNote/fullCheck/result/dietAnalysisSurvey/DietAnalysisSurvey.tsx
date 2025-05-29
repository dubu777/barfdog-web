import * as styles from './DietAnalysisSurvey.css';
import Image from "next/image";
import AccordionIcon from '/public/images/icons/chevron-right-blue.svg';
import SurveyImage from '/public/images/healthNote/full-check/diet-analysis-survey.png'
import DefaultText from "@/components/common/defaultText/DefaultText";
import Button from "@/components/common/button/Button";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";

const DietAnalysisSurvey = () => {
	return (
		<article className={styles.dietAnalysisSurveyContainer}>
			<div className={styles.dietAnalysisSurveyHeader}>
				<DefaultText type='title3' align='center'>우리 아이에게 딱 맞는<br/>1:1 맞춤 식단을 추천 받아 보세요!</DefaultText>
				<DefaultText type='body3' color='gray600' align='center'>
					AI를 통해 활동량과 나이, 몸무게, 알로지,<br/>건강 고민에 따른 맞춤 식단을 추천해 드려요
				</DefaultText>
			</div>
			<Image src={SurveyImage} alt='survey image' width={335} height={240} />
			<Button variant='solid' fullWidth>
				식단 추천 받으러 가기
				<SvgIcon src={AccordionIcon} color='white' />
			</Button>
		</article>
	);
};

export default DietAnalysisSurvey;