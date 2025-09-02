import { TextColor } from "@/types/typography";
import Text from "@/components/common/text/Text";

interface SubtitleTextProps {
	text: string;
	color?: TextColor;
}

export default function SubtitleText({
	text,
	color = 'gray900',
}: SubtitleTextProps) {
	return (
		<Text type='label1' color={color}>
			{text}
		</Text>
	);
}