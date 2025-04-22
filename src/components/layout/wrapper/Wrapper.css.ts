import { globalStyle, style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const wrapperContainer = style({
	minHeight: '100vh',
	background: themeVars.colors.gray.gray50,
})

globalStyle(`${wrapperContainer} > section`, {
	height: '100%',
})