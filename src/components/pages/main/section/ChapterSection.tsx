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
import { cardShadow } from "@/components/ui/card/Card.css";
import MainContainer from "@/components/pages/main/layout/MainContainer";
import MainTitle from "@/components/pages/main/common/MainTitle";
import Button from "@/components/ui/button/Button";
import Text from "@/components/ui/text/Text";
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

const parentVariants0 = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const childVariants0 = {
  hidden: { opacity: 0, rotateY: -180 },
  visible: {
    opacity: 1,
    rotateY: 0,
    transition: { duration: 1, delay: 0.5 },
  },
};

const parentVariants1 = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const childVariants1 = (i: number) => ({
  hidden: { opacity: 0, ...getPosition(i) },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 1,
      type: "spring",
      damping: 12,
			mass: 1,
      stiffness: 64.02,
      delay: i * 0.1,
    },
  },
});


export default function ChapterSection() {
	const router = useRouter();
	const { isMobileWidth } = useDeviceState();

	const chapterData = MAIN_DATA.CHAPTER;
	return (
		<>
			<MainContainer key={chapterData[0].id} backgroundColor='pinkWhite'>
				<FadeInInteraction>
					<Text type='title2' color='white' className={mainChapterIndexChips}>
						01
					</Text>
					<MainTitle 
						title={chapterData[0].title} 
						subTitle={chapterData[0].subTitle} 
						align='left'
						noPaddingTop
					/>
				</FadeInInteraction>
				<motion.div
					variants={parentVariants0}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.2 }}
					className={mainChapter1ImageList}
				>
					{chapterData[0].imagesUrl?.map((image, i) => (
						<motion.div key={i} variants={childVariants0}>
							<Image
								src={image}
								alt={`chapter0 image`}
								width={159}
								height={344}
								className={`${cardShadow.strong} ${mainChapter1Image}`}
							/>
						</motion.div>
					))}
				</motion.div>
				<div className={mainBox}>
					<Button
						onClick={() => router.push(chapterData[0].action.url)} 
						variant={chapterData[0].action.variant} 
						fullWidth={chapterData[0].action.fullWidth}
					>
						{chapterData[0].action.label}
					</Button>
				</div>
			</MainContainer>
			<MainContainer key={chapterData[1].id} backgroundColor='gray50'>
				<FadeInInteraction>
					<Text type='title2' color='white' className={mainChapterIndexChips}>
						02
					</Text>
					<MainTitle 
						title={chapterData[1].title} 
						subTitle={chapterData[1].subTitle} 
						align='left'
						noPaddingTop
					/>
				</FadeInInteraction>
				<motion.div
					variants={parentVariants1}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.2 }}
					className={mainChapter2ImageList({ isMobileWidth })}
				>
					{chapterData[1].imagesUrl?.map((image, i) => (
						<motion.div
							key={i}
							variants={childVariants1(i)}
							style={{ gridArea: getGridArea(i) }}
							className={mainChapter2ImageBox}
						>
							<Image
								src={image}
								alt={`chapter1 image`}
								width={276}
								height={370}
								className={mainChapter2Image}
							/>
						</motion.div>
					))}
				</motion.div>
				<div className={mainBox}>
					<Button 
						onClick={() => router.push(chapterData[1].action.url)} 
						variant={chapterData[1].action.variant} 
						fullWidth={chapterData[1].action.fullWidth}
					>
						{chapterData[0].action.label}
					</Button>
				</div>
			</MainContainer>
			<MainContainer key={chapterData[2].id} backgroundColor='pinkWhite'>
				<FadeInInteraction>
					<Text type='title2' color='white' className={mainChapterIndexChips}>
						03
					</Text>
					<MainTitle 
						title={chapterData[2].title} 
						subTitle={chapterData[2].subTitle} 
						align='left'
						noPaddingTop
					/>
				</FadeInInteraction>
				<Swiper
					slidesPerView='auto'
					spaceBetween={16}
					freeMode
					modules={[ FreeMode ]}
					className={mainChapter3ImageList}
				>
					{chapterData[2].imagesUrl?.map((image, i) => (
						<SwiperSlide 
							key={image} 
							className={mainChapter3ImageSlide}
						>
							<Image 
								src={image} 
								alt={`chapter2 image`} 
								width={1200} 
								height={1200} 
								className={mainChapter3Image} 
							/>
						</SwiperSlide>
					))}
				</Swiper>
				<div className={mainBox}>
					<Button onClick={() => router.push(chapterData[2].action.url)} variant={chapterData[2].action.variant} fullWidth={chapterData[2].action.fullWidth}>
						{chapterData[2].action.label}
					</Button>
				</div>
			</MainContainer>
		</>
	);
};