import { TextColor } from "@/types/typography";
import Text from "@/components/common/text/Text";

interface DescriptionTextProps {
	text: string;
	color?: TextColor;
}

export default function DescriptionText({
	text,
	color = 'gray900',
}: DescriptionTextProps) {
	return (
		<Text type='body3' color={color}>
			{text}
		</Text>
	);
}