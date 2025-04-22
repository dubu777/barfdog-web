import { useRouter } from "next/navigation";
import { mainBox, mainReviewDescription } from "@/components/pages/main/common/MainCommon.css";
import MainContainer from "@/components/pages/main/layout/MainContainer";
import MainTitle from "@/components/pages/main/common/MainTitle";
import Button from "@/components/common/button/Button";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { MAIN_DATA } from "@/constants/main";

const ReviewSection = () => {
	const router = useRouter();
	const title = MAIN_DATA.REVIEW.title;
	const subTitle = MAIN_DATA.REVIEW.subTitle;
	const description = MAIN_DATA.REVIEW.description;
	const action = MAIN_DATA.REVIEW.action;
	return (
		<MainContainer backgroundColor='pinkWhite'>
			<MainTitle title={title} subTitle={subTitle} />
			<DefaultText type='body2' block className={mainReviewDescription}>
				{description}
			</DefaultText>
			<div className={mainBox}>
				<Button onClick={() => router.push(action.url)} variant={action.variant} fullWidth={action.fullWidth}>
					{action.label}
				</Button>
			</div>
		</MainContainer>
	);
};

export default ReviewSection;