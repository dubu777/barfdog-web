import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  mainBox,
  mainBrandStoryContainer,
  mainBrandStoryLogo,
  mainBrandStoryMarquee,
} from "@/components/pages/main/common/MainCommon.css";
import Marquee from "react-fast-marquee";
import MainContainer from "@/components/pages/main/layout/MainContainer";
import MainTitle from "@/components/pages/main/common/MainTitle";
import Button from "@/components/common/button/Button";
import { MAIN_DATA } from "@/constants/main";

export default function BrandStorySection() {
	const router = useRouter();

	const title = MAIN_DATA.BRAND_STORY.title;
	const subTitle = MAIN_DATA.BRAND_STORY.subTitle;
	const action = MAIN_DATA.BRAND_STORY.action;
	const backgroundImage = MAIN_DATA.BRAND_STORY.imageUrl;

	const logoMarquee = Array(4).fill(MAIN_DATA.BRAND_STORY.imagesUrl).flat();;
	
	return (
		<>
			<MainContainer backgroundImage={backgroundImage} className={mainBrandStoryContainer}>
				<MainTitle title={title} subTitle={subTitle} />
				<div className={mainBox}>
					<Button onClick={() => router.push(action.url)} variant={action.variant} fullWidth={action.fullWidth} fill={false}>
						{action.label}
					</Button>
				</div>
			</MainContainer>
			<Marquee speed={60} className={mainBrandStoryMarquee}>
				{logoMarquee.map((logo, index) => (
					<Image key={index} src={logo} alt={`${logo}${index}`} width={200} height={40} className={mainBrandStoryLogo} />
				))}
			</Marquee>
		</>
	);
}
