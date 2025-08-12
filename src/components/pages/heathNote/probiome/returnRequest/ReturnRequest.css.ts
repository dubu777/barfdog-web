import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const returnRequestContainer = style({
	backgroundColor: themeVars.colors.gray.gray0,
})

export const completedContainer = style({
	width: '100%',
	backgroundColor: themeVars.colors.gray.gray50,
	display: 'flex',
	flexDirection: 'column',
	gap: '12px',
	alignItems: 'center',
	height: '100%',
})