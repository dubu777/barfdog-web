import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const userInfoFormContainer = style({
	paddingBottom: '40px',
	borderBottom: `1px solid ${themeVars.borderColors.greyDD}`,
	margin: '40px 0 0',
	display: 'flex',
	flexDirection: 'column',
	gap: '1rem',
})

export const userInfoInputBox = style({
	display: 'flex',
	justifyContent: 'space-between',
})

export const userInfoLabel = style({
	width: '30%',
})

export const userInfoInput = style({
	width: '70%',
})

export const inputField = style({
	width: '100%',
	display: 'flex',
	gap: '10px'
})

export const validationButton = style({
	width: '40% !important',
})

export const inputError = style({
	width: '100%',
	textAlign: 'left',
	fontSize: themeVars.fontSize["text-xs"],
	marginTop: '10px'
})