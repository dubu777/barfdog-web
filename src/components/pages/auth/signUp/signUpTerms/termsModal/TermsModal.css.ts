import { globalStyle, style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const termsModalContainer = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '20px',
})

export const termsModalContent = style({
	textAlign: 'left',
	fontSize: themeVars.fontSize["text-sm"],
	lineHeight: 1.5,
	border: `1px solid ${themeVars.borderColors.greyDD}`,
	borderRadius: '5px',
	padding: '10px',
})

globalStyle(`${termsModalContent} h6`, {
	textAlign: 'left',
	fontSize: themeVars.fontSize["text-md"],
	marginBottom: '10px',
})