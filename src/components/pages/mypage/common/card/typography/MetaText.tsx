import { Fragment } from "react";
import { commonWrapper } from "@/styles/common.css";
import { TextColor, TextType } from "@/types/typography";
import Divider from "@/components/common/divider/Divider";
import Text from "@/components/common/text/Text";

interface MetaTextProps {
	type?: TextType;
	color?: TextColor;
	textList?: string[];
}

export default function MetaText({
	type = 'caption',
	color = 'gray500',
	textList = [],
}: MetaTextProps) {
	return (
		<Text
			type={type}
			color={color}
			className={commonWrapper({ align: 'center', justify: 'start', gap: 4, width: 'auto' })}
		>
			{textList?.map((text, index) => (
				<Fragment key={text}>
					{text}
					{textList?.length !== index + 1 &&
						<div style={{ height: '10px' }}>
							<Divider thickness={1} direction='vertical' color={color === 'gray500' ? 'gray500' : 'gray700'} />
						</div>
					}
				</Fragment>
			))}
		</Text>
	);
}