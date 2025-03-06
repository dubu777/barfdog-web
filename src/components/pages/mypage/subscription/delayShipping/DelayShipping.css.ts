import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const delayShippingContainer = style({
	background: themeVars.colors.gray.gray50,
	marginBottom: '150px',
})

export const userShippingBox = style({
	paddingBottom: '4px',
})

export const userShippingText = style({
	padding: '20px',
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
})

export const selectShippingBox = style({
	padding: '20px',
	background: themeVars.colors.gray.gray0,
})

export const shippingInfoBox = style({
	padding: '20px',
})

export const shippingInfo = style({
	padding: '12px',
	border: `1px solid ${themeVars.colors.red.pastelRed}`,
	background: themeVars.colors.red.pastelPink,
	display: 'flex',
	gap: '8px',
	borderRadius: '8px',
})

export const infoText = style({
	width: 'calc(100% - 32px)',
})