import Image from "next/image";
import {
	mainContainer,
	mainSurveyImage1,
	mainSurveyImageBox, mainSurveyImageInnerBox
} from "@/components/pages/main/common/MainCommon.css";
import { pointColor } from "@/styles/common.css";
import MainTitle from "@/components/pages/main/common/MainTitle";
import SurveyImage1 from "/public/images/main/recipe_survey1.png";
import SurveyImage2 from "/public/images/main/recipe_survey2.png";
import { motion } from 'framer-motion';

const RecipeSection = () => {
	const title = <>빅대이터 기반의<br/><span className={pointColor}>과학적 맞춤 레시피</span></>
	const subTitle = <>같은 견종이어도 다 같은 강아지가 아니기에<br/>진단부터 제조까지 우리 아이 맞춤형 서비스</>
	return (
		<article className={mainContainer}>
			<MainTitle title={title} subTitle={subTitle} hasInteraction />
			<div className={mainSurveyImageBox}>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1], }} className={mainSurveyImageInnerBox}
				>
					<Image src={SurveyImage2} alt='surveyImage2' width={144} />
					<Image src={SurveyImage1} alt='surveyImage1' width={144} className={mainSurveyImage1} />
				</motion.div>
			</div>
		</article>
	);
};

export default RecipeSection;