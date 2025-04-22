import { ReactNode } from "react";
import { mainContainer, mainContainerBackgroundColor } from "@/components/pages/main/common/MainCommon.css";
import { MAIN_BACKGROUND_COLORS } from "@/constants/style";

interface MainContainerProps {
	children: ReactNode;
	className?: string;
	backgroundColor?: keyof typeof MAIN_BACKGROUND_COLORS;
}

const MainContainer = ({
	children,
	className,
	backgroundColor = 'gray50',
}: MainContainerProps) => {
	const background = mainContainerBackgroundColor[backgroundColor];
	return (
		<article className={`${mainContainer} ${background} ${className || ''}`}>
			{children}
		</article>
	);
};

export default MainContainer;