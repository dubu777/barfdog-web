import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const dogTypeModalContainer = style({
	background: themeVars.colors.gray.gray50,
	padding: '32px 20px 20px',
	display: 'flex',
	flexDirection: 'column',
	gap: '32px',
})