import { useRouter } from "next/navigation";
import Image from "next/image";
import {
	mainBox,
	mainChapter1Image,
	mainChapter1ImageList,
	mainChapter2Image,
	mainChapter2ImageList,
	mainChapter3Image,
	mainChapterIndexChips,
} from "@/components/pages/main/common/MainCommon.css";
import { cardShadow } from "@/components/common/card/Card.css";
import MainContainer from "@/components/pages/main/layout/MainContainer";
import MainTitle from "@/components/pages/main/common/MainTitle";
import Button from "@/components/common/button/Button";
import DefaultText from "@/components/common/defaultText/DefaultText";
import FadeInInteraction from "@/components/pages/main/common/FadeInInteraction";
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css/free-mode';
import 'swiper/css';
import { MAIN_DATA } from "@/constants/main";

const getPosition = (index: number) => {
	if (index === 0) return { x: 0, y: -40 };
	if (index === 1) return { x: 40, y: 0 };
	if (index === 2) return { x: 0, y: 40 };
	return { x: 0, y: 0 };
};

const getWidth = (index: number) => (index === 2 ? '100%' : 'calc(50% - 4px)');

const ChapterSection = () => {
	const router = useRouter();
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
					<div className={mainChapter2ImageList}>
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
								viewport={{ once: true, amount: 'all' }}
								style={{
									width: getWidth(i),
									borderRadius: '8px',
								}}
								className={cardShadow.strong}
							>
								<Image
									src={image}
									alt={`chapter${i} image`}
									width={334}
									height={250}
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
						className={mainBox}
					>
						{imagesUrl.map((image, i) => (
							<SwiperSlide
								key={i}
								className={mainChapter3Image}
							>
								<Image src={image} alt={`chapter${i} image`} width={247} height={280} />
							</SwiperSlide>
						))}
					</Swiper>
				)
		}
	}
	return (
		<>
			{chapterData.map((chapter, index) => (
				<MainContainer key={chapter.id} backgroundColor={index === 1 ? 'gray50' : 'pinkWhite'}>
					<FadeInInteraction>
						<DefaultText type='title2' color='white' className={mainChapterIndexChips}>
							0{index+1}
						</DefaultText>
						<MainTitle title={chapter.title} subTitle={chapter.subTitle} align='left' />
					</FadeInInteraction>
					<ChapterComponent imagesUrl={chapter.imagesUrl} index={index} />
					<div className={mainBox}>
						<Button onClick={() => router.push(chapter.action.url)} variant={chapter.action.variant} fullWidth={chapter.action.fullWidth}>
							{chapter.action.label}
						</Button>
					</div>
				</MainContainer>
			))}
		</>
	);
};

export default ChapterSection;