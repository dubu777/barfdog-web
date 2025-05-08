import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const detailContainer = style({
	background: themeVars.colors.gray.gray0,
})

export const detailHeader = style({
	padding: '20px',
	display: 'flex',
	flexDirection: 'column',
	gap: '20px',
	background: themeVars.colors.gray.gray50,
})

export const detailContents = style({
	padding: '60px 20px',
})