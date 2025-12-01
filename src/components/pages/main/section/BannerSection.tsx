import Link from "next/link";
import Image from "next/image";
import {
  mainBannerContainer,
  mainBannerImage,
  mainBannerLink,
  mainBannerSlider,
} from "@/components/pages/main/common/MainCommon.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import useDeviceState from "@/hooks/useDeviceState";
import { useGetMainBannerInfo } from "@/api/main/queries/useGetMainBannerInfo";

export default function BannerSection() {
  const { isMobileWidth } = useDeviceState();
  const { data: mainBannerInfo } = useGetMainBannerInfo();
  console.log(mainBannerInfo);

  if (!mainBannerInfo) return null;
  return (
    <article className={mainBannerContainer}>
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 3000,
        }}
        slidesPerView="auto"
        className={mainBannerSlider}
      >
        {mainBannerInfo?.mainBannerList.map((banner) => {
          const linkUrl = isMobileWidth
            ? banner.mobileRedirectUrl
            : banner.pcRedirectUrl;
          const imageUrl = isMobileWidth
            ? banner.mobileDisplayBannerUrl.url
            : banner.pcDisplayBannerUrl.url;
          return (
            <SwiperSlide key={banner.id}>
              <Link href={linkUrl} className={mainBannerLink}>
                <Image
                  src={imageUrl}
                  alt={banner.name}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className={mainBannerImage}
                />
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </article>
  );
}
