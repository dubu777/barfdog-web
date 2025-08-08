import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const coatQuestionContainer = style({
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	gap: '16px',
})

export const coatQuestionBox = style({
	width: '100%',
	display: 'flex',
	alignItems: 'center',
	gap: '12px',
})

export const coatQuestion = style({
	width: '100%',
	border: `1px solid ${themeVars.colors.gray.gray300}`,
	backgroundColor: themeVars.colors.gray.gray0,
	borderRadius: '8px',
	display: 'flex',
	flexDirection: 'column',
	gap: '2px',
	padding: '8px 12px',
})

export const coatIcon = style({
	marginLeft: 'auto',
})