import { commonWrapper } from "@/styles/common.css";
import Divider from "@/components/common/divider/Divider";
import Text from "@/components/common/text/Text";
import { TextColor, TextType } from "@/types/typography";

interface MetaTextProps {
	type?: TextType;
	color?: TextColor;
	leftText: string;
	rightText?: string;
}

export default function MetaText({
	type = 'caption',
	color = 'gray500',
	leftText,
	rightText,
}: MetaTextProps) {
	return (
		<Text
			type={type}
			color={color}
			className={commonWrapper({ align: 'center', justify: 'start', gap: 4 })}
		>
			{leftText}
			{rightText &&
				<div style={{ height: '10px' }}>
					<Divider thickness={1} direction='vertical' color={color === 'gray500' ? 'gray500' : 'gray700'} />
				</div>
			}
			{rightText}
		</Text>
	);
}