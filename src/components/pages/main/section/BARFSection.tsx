import { useRouter } from "next/navigation";
import { mainBarfImage, mainBarfContentBox } from "@/components/pages/main/common/MainCommon.css";
import Image from "next/image";
import Button from "@/components/ui/button/Button";
import MainContainer from "@/components/pages/main/layout/MainContainer";
import MainTitle from "@/components/pages/main/common/MainTitle";
import FadeInInteraction from "@/components/pages/main/common/FadeInInteraction";
import { MAIN_DATA } from "@/constants/main";

export default function BARFSection() {
	const router = useRouter();

	const title = MAIN_DATA.BARF.title;
	const subTitle = MAIN_DATA.BARF.subTitle;
	const imageUrl = MAIN_DATA.BARF.imageUrl;
	return (
		<MainContainer backgroundColor='white'>
			<MainTitle title={title} subTitle={subTitle} align='left' />
			<div className={mainBarfContentBox}>
				<FadeInInteraction viewportOnce={false}>
					<Image 
						src={imageUrl} 
						alt='Barf Image' 
						width={1200} 
						height={1200} 
						className={mainBarfImage}
					/>
				</FadeInInteraction>
				<Button 
					variant='outline' 
					intent='assistive' 
					fullWidth 
					onClick={() => router.push('/recipes')}
				>
					바프식 레시피 성분 보러가기
				</Button>
			</div>
		</MainContainer>
	);
}