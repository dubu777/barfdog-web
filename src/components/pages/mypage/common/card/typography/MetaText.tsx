import { Fragment } from "react";
import { commonWrapper } from "@/styles/common.css";
import { TextColor, TextType } from "@/types/typography";
import Text from "@/components/ui/text/Text";
import ListDivider from "@/components/ui/listDivider/ListDivider";

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
					<div style={{ height: '12px' }}>
						<ListDivider 
							listLength={textList?.length ?? 0}
							index={index}
							color='gray200'
							thickness={1}
							direction='vertical'
						/>
					</div>
				</Fragment>
			))}
		</Text>
	);
}