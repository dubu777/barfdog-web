import { ReactNode } from "react";
import { mainTitle } from "@/components/pages/main/common/MainCommon.css";
import Text from "@/components/common/text/Text";
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
			<Text type='title2' align={align} preLine>{title}</Text>
			<Text type='body2' align={align} preLine>{subTitle}</Text>
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