import { ReactNode } from "react";
import { mainContainer, mainContainerBackgroundColor } from "@/components/pages/main/common/MainCommon.css";
import { MAIN_BACKGROUND_COLORS } from "@/constants/style";

interface MainContainerProps {
	children: ReactNode;
	className?: string;
	backgroundColor?: keyof typeof MAIN_BACKGROUND_COLORS;
	backgroundImage?: string;
	noPaddingBottom?: boolean;
}

const MainContainer = ({
	children,
	className,
	backgroundColor = 'gray50',
	backgroundImage,
	noPaddingBottom = false,
}: MainContainerProps) => {
	const background = mainContainerBackgroundColor[backgroundColor];
	return (
		<article
			className={`${mainContainer} ${background} ${className || ''}`}
			style={{
				padding: `60px 0 ${noPaddingBottom ? '0': ''}`,
				background: backgroundImage ? `url(${backgroundImage}) no-repeat bottom center / cover` : undefined,
			}}
		>
			{children}
		</article>
	);
};

export default MainContainer;