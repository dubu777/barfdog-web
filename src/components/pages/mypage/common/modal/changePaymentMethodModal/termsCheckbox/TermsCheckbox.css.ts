import { style } from "@vanilla-extract/css";

export const termsBox = style({
	padding: '20px',
	display: 'flex',
	flexDirection: 'column',
	gap: '16px',
})

export const termsBottom = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '8px',
})

export const termCheckbox = style({
	display: 'flex',
	alignItems: 'center !important',
	padding: '4px 0',
})

export const agreeAllTerms = style({
	width: '100%',
	display: 'flex',
	justifyContent: 'space-between',
})

export const termsNotice = style({
	display: 'flex',
	alignItems: 'center',
	gap: '6.5px',
})
