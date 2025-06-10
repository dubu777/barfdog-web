import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const cancelSubscriptionTitle = style({
	padding: '40px 20px 20px',
})

export const cancelSubscriptionCard = style({
	padding: '20px',
	backgroundColor: themeVars.colors.gray.gray50,
})

export const cancelSubscriptionNotice = style({
	padding: '20px',
	backgroundColor: themeVars.colors.gray.gray0,
})

export const cancelSubscriptionNoticeBox = style({
	backgroundColor: themeVars.colors.red.pinkWhite,
	border: `1px solid ${themeVars.colors.red.pastelRed}`,
})

export const cancelSubscriptionNoticeTitle = style({
	display: 'flex',
	gap: '8px',
	alignItems: 'center',
	marginBottom: '8px',
})

export const cancelSubscriptionNoticeList = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '8px',
	marginLeft: '8px',
})
