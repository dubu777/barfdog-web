import { useRouter } from "next/navigation";
import Image from "next/image";
import {
	mainBox,
	mainChapter1Image,
	mainChapter1ImageList,
	mainChapter2Image,
	mainChapter2ImageBox,
	mainChapter2ImageList,
	mainChapter3Image,
	mainChapter3ImageList,
	mainChapter3ImageSlide,
	mainChapterIndexChips,
} from "@/components/pages/main/common/MainCommon.css";
import { cardShadow } from "@/components/common/card/Card.css";
import MainContainer from "@/components/pages/main/layout/MainContainer";
import MainTitle from "@/components/pages/main/common/MainTitle";
import Button from "@/components/common/button/Button";
import Text from "@/components/common/text/Text";
import FadeInInteraction from "@/components/pages/main/common/FadeInInteraction";
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css/free-mode';
import 'swiper/css';
import useDeviceState from "@/hooks/useDeviceState";
import { MAIN_DATA } from "@/constants/main";

const getPosition = (index: number) => {
	if (index === 0) return { x: 0, y: -40 };
	if (index === 1) return { x: 0, y: 0 };
	if (index === 2) return { x: 0, y: 40 };
	return { x: 0, y: 0 };
};

const getGridArea = (index: number) => {
	if (index === 0) return '1 / 1 / 2 / 2'; // 첫 번째 행, 첫 번째 열
	if (index === 1) return '1 / 2 / 2 / 3'; // 첫 번째 행, 두 번째 열
	if (index === 2) return '2 / 1 / 3 / 3'; // 두 번째 행, 전체 너비
	return '';
};

export default function ChapterSection() {
	const router = useRouter();
	const { isMobileWidth } = useDeviceState();

	const chapterData = MAIN_DATA.CHAPTER;

	const ChapterComponent = ({ index, imagesUrl }: { index: number, imagesUrl: readonly string[] }) => {
		switch (index) {
			case 0:
				return (
					<div className={mainChapter1ImageList}>
						{imagesUrl?.map((image, i) => (
							<motion.div
								key={i}
								initial={{ opacity: 0, transform: 'rotateY(-180deg)' }}
								whileInView={{ opacity: 1, transform: 'rotateX(0)' }}
								viewport={{ once: true }}
								transition={{ duration: 1, delay: .5 }}
							>
								<Image
									src={image}
									alt={`chapter${i} image`}
									width={159}
									height={344}
									className={`${cardShadow.strong} ${mainChapter1Image}`}
								/>
							</motion.div>
						))}
					</div>
				);
			case 1:
				return (
					<div className={mainChapter2ImageList({ isMobileWidth: isMobileWidth })}>
						{imagesUrl?.map((image, i) => (
							<motion.div
								key={i}
								initial={{ opacity: 0, ...getPosition(i) }}
								whileInView={{ opacity: 1, x: 0, y: 0 }}
								transition={{
									duration: 1,
									delay: i * 0.1,
									damping: 12,
									mass: 1,
									stiffness: 64.02,
									type: 'spring',
								}}
								viewport={{ once: true,}}
								style={{
									gridArea: getGridArea(i),
								}}
								className={mainChapter2ImageBox}
							>
								<Image
									src={image}
									alt={`chapter${i} image`}
									width={276}
									height={370}
									className={mainChapter2Image}
								/>
							</motion.div>
						))}
					</div>
				)
			case 2:
				return (
					<Swiper
						spaceBetween={16}
						slidesPerView='auto'
						freeMode
						modules={[ FreeMode ]}
						className={mainChapter3ImageList}
					>
						{imagesUrl.map((image, i) => (
							<SwiperSlide
								key={i}
								className={mainChapter3ImageSlide}
							>
								<Image 
									src={image} 
									alt={`chapter${i} image`} 
									width={1200} 
									height={1200} 
									className={mainChapter3Image} 
								/>
							</SwiperSlide>
						))}
					</Swiper>
				)
		}
	}
	return (
		chapterData.map((chapter, index) => (
			<MainContainer key={chapter.id} backgroundColor={index === 1 ? 'gray50' : 'pinkWhite'}>
				<FadeInInteraction>
					<Text type='title2' color='white' className={mainChapterIndexChips}>
						0{index+1}
					</Text>
					<MainTitle 
						title={chapter.title} 
						subTitle={chapter.subTitle} 
						align='left'
						noPaddingTop
					/>
				</FadeInInteraction>
				<ChapterComponent imagesUrl={chapter.imagesUrl} index={index} />
				<div className={mainBox}>
					<Button onClick={() => router.push(chapter.action.url)} variant={chapter.action.variant} fullWidth={chapter.action.fullWidth}>
						{chapter.action.label}
					</Button>
				</div>
			</MainContainer>
		))
	);
};