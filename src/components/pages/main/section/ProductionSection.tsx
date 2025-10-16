import { Fragment } from "react";
import Image from "next/image";
import MainContainer from "@/components/pages/main/layout/MainContainer";
import MainTitle from "@/components/pages/main/common/MainTitle";
import Text from "@/components/common/text/Text";
import {
	mainProductionImage, mainProductionImageBox,
	mainProductionPoint,
	mainProductionPointDivider,
	mainProductionPointsBox, mainProductionVideo
} from "@/components/pages/main/common/MainCommon.css";
import { MAIN_DATA } from "@/constants/main";

export default function ProductionSection() {
	const title = MAIN_DATA.PRODUCTION.title;
	const subTitle = MAIN_DATA.PRODUCTION.subTitle;
	const topPoints = MAIN_DATA.PRODUCTION.descriptions;
	const imageList = MAIN_DATA.PRODUCTION.imagesUrl;
	return (
		<>
			<ul className={mainProductionPointsBox}>
				{topPoints.map((point, index) => (
					<Fragment key={point.label}>
						<li className={mainProductionPoint}>
							<Image src={point.imageUrl} alt={point.label} width={point.width} height={point.height} priority />
							<Text type='headline4' color='white' preLine align='center'>{point.label}</Text>
						</li>
						{index !== topPoints.length-1 &&
						<li className={mainProductionPointDivider} />
						}
					</Fragment>
				))}
			</ul>
			<MainContainer backgroundColor='gray200' noPaddingBottom>
				<MainTitle title={title} subTitle={subTitle} />
				<div className={mainProductionImageBox}>
					{imageList.map((image, index) => (
						<Image key={image} src={image} alt={`인증서 ${index+1}`} width={300} height={300} className={mainProductionImage} />
					))}
				</div>
				<video 
					preload='none' 
					muted 
					autoPlay 
					loop 
					playsInline
					webkit-playsinline="true"
					className={mainProductionVideo}
				>
					<source src='/videos/main_video.mp4' type='video/mp4'/>
				</video>
			</MainContainer>
		</>
	);
};