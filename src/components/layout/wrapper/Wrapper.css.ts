import { globalStyle, style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const wrapperContainer = style({
	marginTop: '60px',
	minHeight: 'calc(100vh - 60px)',
	marginBottom: '60px',
	background: themeVars.colors.gray.gray50,
})

globalStyle(`${wrapperContainer} > section`, {
	height: '100%',
})