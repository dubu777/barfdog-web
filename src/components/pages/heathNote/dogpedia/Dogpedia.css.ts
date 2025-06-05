import { style } from "@vanilla-extract/css";

export const searchDogContainer = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '32px',
	padding: '0 20px 20px',
	marginTop: '35.5px'
})

export const searchableSelector = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '20px',
})

export const searchableSelectorButton = style({
	justifyContent: 'space-between !important',
	padding: '20px 16px 20px 24px !important',
})

export const searchableSelectorEmpty = style({
	width: '100%',
	display: 'flex',
	justifyContent: 'center',
	paddingTop: '20px',
})
