import { globalStyle, style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const myPageWrapperContainer = style({
	marginTop: '60px',
	minHeight: 'calc(100vh - 60px)',
	background: themeVars.colors.gray.gray50,
})

globalStyle(`${myPageWrapperContainer} > section`, {
	height: '100%',
})