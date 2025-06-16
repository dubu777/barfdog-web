import { style } from "@vanilla-extract/css";

export const addressContainer = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '16px',
})

export const addressHeader = style({
	width: '100%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
})

export const addressContent = style({
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
})

export const addressInfo = style({
	width: '100%',
	display: 'flex',
	gap: '8px',
	marginBottom: '12px',
})

export const addressChangeButton = style({
	cursor: 'pointer',
})
