import Image from "next/image";
import MainContainer from "@/components/pages/main/layout/MainContainer";
import MainTitle from "@/components/pages/main/common/MainTitle";
import FadeInInteraction from "@/components/pages/main/common/FadeInInteraction";
import { mainBarfImage } from "@/components/pages/main/common/MainCommon.css";
import { MAIN_DATA } from "@/constants/main";

const BARFSection = () => {
	const title = MAIN_DATA.BARF.title;
	const subTitle = MAIN_DATA.BARF.subTitle;
	const imageUrl = MAIN_DATA.BARF.imageUrl;
	return (
		<MainContainer backgroundColor='white'>
			<MainTitle title={title} subTitle={subTitle} align='left' />
			<div className={mainBarfImage}>
				<FadeInInteraction viewportOnce={false}>
					<Image src={imageUrl} alt='Barf Image' width={335} height={335} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
				</FadeInInteraction>
			</div>
		</MainContainer>
	);
};

export default BARFSection;