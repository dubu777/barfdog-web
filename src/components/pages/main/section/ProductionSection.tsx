import { Fragment, useEffect, useRef } from "react";
import Image from "next/image";
import MainContainer from "@/components/pages/main/layout/MainContainer";
import MainTitle from "@/components/pages/main/common/MainTitle";
import Text from "@/components/ui/text/Text";
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

	const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
		// 모바일: chrome 안정화를 위한 비디오 자동재생 적용
    const video = videoRef.current;
    if (!video) return;

    // 필수 속성
    video.muted = true;
    video.playsInline = true;
    video.loop = true;

    // DOM 렌더링 후 play 시도
    const tryPlay = async () => {
      await video.play().catch(() => {
        console.log('Autoplay blocked, will retry on user interaction');
      });
    };

    // 사용자 터치 이벤트 발생시 play 시도
    const handleTouch = () => {
      tryPlay();
      window.removeEventListener('touchstart', handleTouch);
    };
    window.addEventListener('touchstart', handleTouch);

    return () => {
      window.removeEventListener('touchstart', handleTouch);
    };
  }, []);

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
					ref={videoRef}
					muted
					autoPlay
					loop
					playsInline
					className={mainProductionVideo}
				>
					<source src='/videos/main_video.mp4' type='video/mp4'/>
				</video>
			</MainContainer>
		</>
	);
};