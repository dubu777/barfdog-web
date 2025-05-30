import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const resultCard = style({
	background: `${themeVars.colors.gray.gray100} !important`,
	padding: '20px 16px !important'
})

export const resultCardHeader = style({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: '4px',
})