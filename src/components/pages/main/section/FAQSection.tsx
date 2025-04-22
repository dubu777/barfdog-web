import { useRouter } from "next/navigation";
import MainContainer from "@/components/pages/main/layout/MainContainer";
import MainTitle from "@/components/pages/main/common/MainTitle";
import Button from "@/components/common/button/Button";
import DefaultText from "@/components/common/defaultText/DefaultText";
import {
	mainBox,
	mainFAQButton,
	mainFAQButtonAvatar,
	mainFAQButtonBox,
	mainFAQDescription, mainFAQDescriptionBox
} from "@/components/pages/main/common/MainCommon.css";
import FaqAvatar from '/public/images/main/faqAvatar.svg';
import { MAIN_DATA } from "@/constants/main";

const FAQSection = () => {
	const router = useRouter();
	const title = MAIN_DATA.FAQ.title;
	const subTitle = MAIN_DATA.FAQ.subTitle;
	const action = MAIN_DATA.FAQ.action;
	const descriptions = MAIN_DATA.FAQ.descriptions;
	return (
		<MainContainer backgroundColor='yellow'>
			<MainTitle title={title} subTitle={subTitle} />
			<div className={mainFAQDescriptionBox}>
				{descriptions.map(description => (
					<DefaultText key={description} type='label4' className={mainFAQDescription}>
						{description}
					</DefaultText>
				))}
			</div>
			<div className={`${mainBox} ${mainFAQButtonBox}`}>
				<Button onClick={() => router.push(action.url)} variant={action.variant} fullWidth={action.fullWidth} className={mainFAQButton}>
					<FaqAvatar className={mainFAQButtonAvatar} />
					{action.label}
				</Button>
			</div>
		</MainContainer>
	);
};

export default FAQSection;