import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const progressBarContainer = style({
	position: 'relative',
	width: '100%',
	background: themeVars.colors.gray.gray400,
	borderRadius: '60px',
	height: '4px',
})

export const progressActive = style({
	position: 'absolute',
	top: 0,
	background: themeVars.colors.red.red,
	transition: 'all .35s',
	height: '4px',
})

export const progressLabel = style({
	position: 'absolute',
	top: '-31px',
	left: '50%',
	transform: 'translateX(-50%)',
	padding: '2px 16px',
	borderRadius: '40px',
	border: `1px solid ${themeVars.colors.red.red}`,
	background: themeVars.colors.gray.gray0,
})

export const progressIndicator = style({
	position: 'absolute',
	top: '0',
	transform: 'translate(-50%, -50%)',
})