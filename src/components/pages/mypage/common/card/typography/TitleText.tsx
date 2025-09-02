import { ReactNode } from "react";
import Text from "@/components/common/text/Text";
import { TextColor } from "@/types/typography";

interface TitleTextProps {
	children: string | ReactNode;
	color?: TextColor;
}

export default function TitleText({
	children,
	color = 'gray900',
}: TitleTextProps) {
	return (
		<Text type='title1' color={color}>
			{children}
		</Text>
	);
}