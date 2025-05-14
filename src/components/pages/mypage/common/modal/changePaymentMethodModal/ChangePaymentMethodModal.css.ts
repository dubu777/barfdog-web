import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const paymentMethodModalContainer = style({
	width: "100%",
	backgroundColor: themeVars.colors.gray.gray0,
})

export const paymentMethodImage = style({
	width: '100%',
	padding: '40px',
	overflow: 'hidden',
})

export const paymentInfo = style({
	backgroundColor: themeVars.colors.gray.gray50,
})

export const changeMethodContainer = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '40px',
	padding: '40px 20px 20px',
})

export const changeMethodTitle = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '4px',
})

export const changeMethodCheckBox = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '8px',
})

export const changeMethodLabel = style({
	border: `1px solid ${themeVars.colors.gray.gray200}`,
	background: themeVars.colors.gray.gray0,
	padding: '12px 16px',
	borderRadius: '8px'
})

export const agreeChangeMethodCheckBox = style({
	padding: '20px',
	position: 'fixed',
	bottom: '88px',
})

export const agreeChangeMethodLabel = style({
	display: 'flex',
	gap: '4px',
})
