import { useRouter } from "next/navigation";
import { mainFirstContainer } from "@/components/pages/main/common/MainCommon.css";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Button from "@/components/common/button/Button";
import { MAIN_DATA } from "@/constants/main";

const FirstSection = () => {
	const router = useRouter();
	const title = MAIN_DATA.FIRST.title;
	const subTitle = MAIN_DATA.FIRST.subTitle;
	const action = MAIN_DATA.FIRST.action;
	return (
		<article className={mainFirstContainer}>
			<DefaultText type='title2' preLine align='center'>{title}</DefaultText>
			<DefaultText type='body1' preLine align='center' style={{ margin: '6px 0 8px' }}>{subTitle}</DefaultText>
			<Button onClick={() => router.push(action.url)} variant={action.variant}>{action.label}</Button>
		</article>
	);
};

export default FirstSection;