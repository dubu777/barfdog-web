import { useRouter } from "next/navigation";
import { mainBox, mainChapterIndexChips } from "@/components/pages/main/common/MainCommon.css";
import MainContainer from "@/components/pages/main/layout/MainContainer";
import MainTitle from "@/components/pages/main/common/MainTitle";
import Button from "@/components/common/button/Button";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { MAIN_DATA } from "@/constants/main";

const ChapterSection = () => {
	const router = useRouter();
	const chapterData = MAIN_DATA.CHAPTER;
	return (
		<>
			{chapterData.map((chapter, index) => (
				<MainContainer key={chapter.id} backgroundColor={index === 1 ? 'gray50' : 'pinkWhite'}>
					<DefaultText type='title2' color='white' className={mainChapterIndexChips}>
						0{index+1}
					</DefaultText>
					<MainTitle title={chapter.title} subTitle={chapter.subTitle} align='left' />
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