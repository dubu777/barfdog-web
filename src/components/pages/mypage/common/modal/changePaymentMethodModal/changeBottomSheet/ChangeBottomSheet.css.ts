import { style } from "@vanilla-extract/css";

export const paymentMethodList = style({
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	gap: '8px',
	padding: '0 20px',
	marginBottom: '85px',
})

export const paymentMethodCheckbox = style({
	justifyContent: 'flex-start !important',
	padding: '12px 16px !important',
})

export const paymentMethodLabel = style({
	width: '100%',
	height: '100%',
})
