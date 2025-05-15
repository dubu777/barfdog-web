import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const bottomSheetTitle = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '12px',
	padding: '20px',
})

export const bottomSheetItem = style({
	width: '100%',
	padding: '20px',
	background: themeVars.colors.gray.gray50,
})

export const bottomSheetItemTitle = style({
	display: 'flex',
	justifyContent: 'space-between',
	marginBottom: '8px',
})