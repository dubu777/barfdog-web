import Image from "next/image";
import {
	mainSurveyImage1,
	mainSurveyImageBox, mainSurveyImageInnerBox
} from "@/components/pages/main/common/MainCommon.css";
import { pointColor } from "@/styles/common.css";
import { motion } from 'motion/react';
import SurveyImage1 from "/public/images/main/recipe_survey1.png";
import SurveyImage2 from "/public/images/main/recipe_survey2.png";
import MainTitle from "@/components/pages/main/common/MainTitle";
import MainContainer from "../layout/MainContainer";
import { MAIN_DATA } from "@/constants/main";

export default function RecipeSection() {
	const title = MAIN_DATA.RECIPE.title.split('\n');
	const subTitle = MAIN_DATA.RECIPE.subTitle;
	return (
		<MainContainer noPaddingBottom>
			<MainTitle 
				title={(
					<>
						{title[0]}<br/>
						<span className={pointColor}>{title[1]}</span>
					</>
				)} 
				subTitle={subTitle} 
				hasInteraction
			/>
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
		</MainContainer>
	);
};