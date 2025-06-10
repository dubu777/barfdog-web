import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const userShippingBox = style({
	paddingBottom: '4px',
})

export const userShippingText = style({
	padding: '40px 20px 20px',
	display: 'flex',
	flexDirection: 'column',
	gap: '4px',
})

export const dogName = style({
	marginTop: '12px'
})

export const userShippingDate = style({
	display: 'flex',
	gap: '4px',
})

export const dateBox = style({
	width: '50%',
	padding: '8px 20px',
	background: themeVars.colors.gray.gray0,
	display: 'flex',
	flexDirection: 'column'
})

export const selectShippingBox = style({
	background: themeVars.colors.gray.gray0,
	paddingBottom: '40px',
	display: 'flex',
	flexDirection: 'column'
})

export const selectShippingText = style({
	padding: '20px'
})

export const shippingInfoBox = style({
	padding: '20px',
})

export const completedBoxDateInfo = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '14px',
	padding: '16px 20px',
	marginTop: '40px',
})

export const completedDate = style({
	display: 'flex',
	justifyContent: 'space-between',
})