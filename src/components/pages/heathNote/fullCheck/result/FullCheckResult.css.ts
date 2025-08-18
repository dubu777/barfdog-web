import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const deleteButton = style({
	width: '24px',
	height: '24px',
	cursor: 'pointer'
})

export const fullCheckResultContainer = style({
	width: '100%',
	height: '100%',
	padding: '20px',
	background: themeVars.colors.gray.gray0,
	display: 'flex',
	flexDirection: 'column',
	gap: '20px',
})

export const fullCheckResultTitle = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	gap: '5px',
	marginBottom: '12px',
})

export const fullCheckResultProduct = style({
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	gap: '12px',
})