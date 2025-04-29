import { ReactNode } from "react";
import { mainTitle } from "@/components/pages/main/common/MainCommon.css";
import DefaultText from "@/components/common/defaultText/DefaultText";
import FadeInInteraction from "@/components/pages/main/common/FadeInInteraction";

interface MainTitleProps {
	title: string | ReactNode;
	subTitle: string | ReactNode;
	align?: 'center' | 'left';
	hasInteraction?: boolean;
}

const MainTitle = ({
	title,
	subTitle,
	align = 'center',
	hasInteraction = false,
}: MainTitleProps) => {
	const ContentElement = () => (
		<div className={mainTitle({ align })}>
			<DefaultText type='title2' align={align} preLine>{title}</DefaultText>
			<DefaultText type='body2' align={align} preLine>{subTitle}</DefaultText>
		</div>
	)
	return (
		hasInteraction
			?
			<FadeInInteraction>
				<ContentElement />
			</FadeInInteraction>
		: <ContentElement />

	);
};

export default MainTitle;