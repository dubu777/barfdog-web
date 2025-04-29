import Link from "next/link";
import Image from "next/image";
import {
	mainBannerContainer,
	mainBannerImage,
	mainBannerLink,
	mainBannerSlider
} from "@/components/pages/main/common/MainCommon.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import useDeviceState from "@/hooks/useDeviceState";
import { MainBanner } from "@/types";

interface BannerSectionProps {
	mainBannerList: MainBanner[];
}

const BannerSection = ({ mainBannerList }: BannerSectionProps) => {
	const { isMobileDevice } = useDeviceState();

	return (
		<article className={mainBannerContainer}>
			<Swiper
				modules={[ Autoplay ]}
				autoplay={{
					delay: 3000,
				}}
				slidesPerView='auto'
				className={mainBannerSlider}
			>
			{mainBannerList.map(banner => {
				const linkUrl = isMobileDevice ? banner.mobileLinkUrl : banner.pcLinkUrl;
				const imageUrl = isMobileDevice ? banner.mobileImageUrl : banner.pcImageUrl;
				return (
					<SwiperSlide
						key={banner.id}
						style={{ height: 'auto' }}
					>
						<Link href={linkUrl} className={mainBannerLink}>
							<Image src={banner.mobileImageUrl} alt={banner.name} width={600} height={600} className={mainBannerImage} />
						</Link>
					</SwiperSlide>
				)
			})}
			</Swiper>
		</article>
	);
};

export default BannerSection;