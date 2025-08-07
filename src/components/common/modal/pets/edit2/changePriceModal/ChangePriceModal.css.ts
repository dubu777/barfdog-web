import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const changePriceTitle = style({
	padding: '40px 20px 20px',
})

export const changePriceContent = style({
	padding: '20px',
	background: themeVars.colors.gray.gray0,
})

export const changePriceInfoBox = style({
	padding: '16px 0',
	display: 'flex',
	flexDirection: 'column',
	gap: '12px',
})

export const changePriceInfo = style({
	padding: '4px 0',
	display: 'flex',
	justifyContent: 'space-between',
})

export const changePriceConfirm = style({
	marginTop: '16px',
})

export const changePriceConfirmText = style({
	display: 'flex',
})

export const changePriceConfirmTextPoint = style({
	minWidth: '40px',
})

export const ChangePriceCompletedBox = style({
	paddingTop: '100px',
})