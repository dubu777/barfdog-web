import { TextColor, TextType } from "@/types/typography";
import Text from "@/components/common/text/Text";

interface SubtitleTextProps {
	text: string;
	type?: TextType;
	color?: TextColor;
}

export default function SubtitleText({
	text,
	type = 'label1',
	color = 'gray900',
}: SubtitleTextProps) {
	return (
		<Text type={type} color={color}>
			{text}
		</Text>
	);
}