import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const ButtonBox = style({
	width: '100%',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	position: 'fixed',
	bottom: 0,
	left: '50%',
	transform: 'translateX(-50%)',
	padding: '20px',
	borderTop: `1px solid ${themeVars.colors.gray.gray200}`,
	background: themeVars.colors.gray.gray0,
	zIndex: 900,
})
