import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const modalContainer = style({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'flex-start',
	alignItems: 'center',
	maxWidth: "600px",
	width: '100%',
	height: '100%',
	margin: '0 auto',
	overflowY: 'auto',
	backgroundColor: themeVars.colors.gray.gray0,
})

export const modalContent = style({
	width: '100%',
	backgroundColor: themeVars.colors.gray.gray50,                                           
})