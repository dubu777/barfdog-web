import { mainTitle } from "@/components/pages/main/common/MainCommon.css";
import DefaultText from "@/components/common/defaultText/DefaultText";

interface MainTitleProps {
	title: string;
	subTitle: string;
	align?: 'center' | 'left';
}

const MainTitle = ({
	title,
	subTitle,
	align = 'center',
}: MainTitleProps) => {
	return (
		<div className={mainTitle({ align })}>
			<DefaultText type='title2' align={align} preLine>{title}</DefaultText>
			<DefaultText type='body2' align={align} preLine>{subTitle}</DefaultText>
		</div>
	);
};

export default MainTitle;