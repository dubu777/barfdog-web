import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";

export const scheduleList = style({
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	gap: '2px',
})

export const scheduleItem = recipe({
	base: {
		display: 'flex',
		alignItems: 'center',
		background: themeVars.colors.gray.gray0,
		padding: '14px 20px',
	},
	variants: {
		active: {
			true: {
				background: 'transparent',
			}
		}
	}
})

export const scheduleItemStatus = style({
	width: '80px',
	textAlign: 'left',
	marginRight: '20px',
})

export const itemPaymentArrivalStatus = style({
	minWidth: '48px',
	display: 'flex',
	flexDirection: 'column',
	gap: '12px',
	marginRight: '12px',
})

export const scheduleActions = style({
	marginLeft: 'auto',
})

export const scheduleActionButton = style({
	display: 'flex',
	alignItems: 'center',
	height: '20px',
	margin: '6px 0'
})

export const scheduleNotice = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '8px',
	padding: '20px 20px 32px',
})
