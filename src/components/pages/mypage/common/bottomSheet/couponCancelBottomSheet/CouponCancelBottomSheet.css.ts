import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const couponCancelHeader = style({
	padding: '20px',
	display: 'flex',
	flexDirection: 'column',
	gap: '12px',
})

export const couponCancelBody = style({
	width: '100%',
	padding: '20px',
	display: 'flex',
	flexDirection: 'column',
	gap: '40px',
	backgroundColor: themeVars.colors.gray.gray50,
})

export const couponCardContainer = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '10px',
	marginTop: '10px',
})

export const usingCoupon = style({
	border: '1px solid red'
})