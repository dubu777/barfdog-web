import { useRouter } from "next/navigation";
import { mainBox } from "@/components/pages/main/common/MainCommon.css";
import MainContainer from "@/components/pages/main/layout/MainContainer";
import MainTitle from "@/components/pages/main/common/MainTitle";
import Button from "@/components/common/button/Button";
import { MAIN_DATA } from "@/constants/main";

const BrandStorySection = () => {
	const router = useRouter();
	const title = MAIN_DATA.BRAND_STORY.title;
	const subTitle = MAIN_DATA.BRAND_STORY.subTitle;
	const action = MAIN_DATA.BRAND_STORY.action;
	return (
		<MainContainer>
			<MainTitle title={title} subTitle={subTitle} />
			<div className={mainBox}>
				<Button onClick={() => router.push(action.url)} variant={action.variant} fullWidth={action.fullWidth}>
					{action.label}
				</Button>
			</div>
		</MainContainer>
	);
};

export default BrandStorySection;