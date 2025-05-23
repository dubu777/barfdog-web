import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const changeGramBottomSheetTitle = style({
	padding: '20px',
	display: 'flex',
	flexDirection: 'column',
	gap: '12px',
})

export const changeGramBottomSheetKcal = style({
	width: '100%',
	padding: '0 20px 20px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	gap: '6px'
})

export const kcalBox = style({
	padding: '0 22.25px',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
})

export const changeGramButtonBox = style({
	width: '100%',
	padding: '20px',
	background: themeVars.colors.gray.gray50,
	display: 'flex',
	gap: '8px',
})
