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
import { useGetMainBannerInfo } from "@/api/main/queries/useGetMainBannerInfo";

export default function BannerSection() {
	const { isMobileWidth } = useDeviceState();
	const { data: mainBannerInfo } = useGetMainBannerInfo();

	if (!mainBannerInfo) return null;
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
			{mainBannerInfo?.mainBannerList.map(banner => {
				const linkUrl = isMobileWidth ? banner.mobileRedirectUrl : banner.pcRedirectUrl;
				return (
					<SwiperSlide
						key={banner.id}
						style={{ height: 'auto' }}
					>
						<Link href={linkUrl} className={mainBannerLink}>
							<Image src={banner.mobileDisplayBannerUrl.url} alt={banner.name} width={1200} height={1200} className={mainBannerImage} />
						</Link>
					</SwiperSlide>
				)
			})}
			</Swiper>
		</article>
	);
};