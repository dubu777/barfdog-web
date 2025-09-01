import Image from "next/image";
import Marquee from "react-fast-marquee";
import {
	mainDeliveryMarquee,
	mainDeliveryMarqueeBox,
	mainDeliveryMarqueeContainer
} from "@/components/pages/main/common/MainCommon.css";
import MainContainer from "@/components/pages/main/layout/MainContainer";
import MainTitle from "@/components/pages/main/common/MainTitle";
import Text from "@/components/common/text/Text";
import { MAIN_DATA } from "@/constants/main";

const DeliverySection = () => {
	const title = MAIN_DATA.DELIVERY.title;
	const subTitle = MAIN_DATA.DELIVERY.subTitle;
	const imageUrl = MAIN_DATA.DELIVERY.imageUrl;
	const description = MAIN_DATA.DELIVERY.description;
	const marqueeList = MAIN_DATA.DELIVERY.descriptions;
	return (
		<>
			<MainContainer>
				<MainTitle title={title} subTitle={subTitle} />
				<Image src={imageUrl} alt='delivery image' width={500} height={500} style={{ width: '100%', height: 'auto', marginBottom: '10px' }} />
				<Text type='body2' align='center' block preLine>{description}</Text>
			</MainContainer>
			<Marquee speed={50} className={mainDeliveryMarqueeContainer}>
				<div className={mainDeliveryMarqueeBox}>
					{[...marqueeList, ...marqueeList].map((marquee, index) => (
						<div key={`${marquee.label}-${index}`} className={mainDeliveryMarquee}>
							<Image src={marquee.imageUrl} alt={marquee.label} width={marquee.width} height={marquee.height} />
							<Text key={index} type='body2' color='white'>{marquee.label}</Text>
						</div>
					))}
				</div>
			</Marquee>
		</>
	);
};

export default DeliverySection;