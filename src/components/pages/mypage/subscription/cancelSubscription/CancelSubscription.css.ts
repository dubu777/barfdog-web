import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const cancelSubscriptionContainer = style({
	minHeight: 'calc(100vh - 60px - 85px)',
	background: themeVars.colors.gray.gray50,
	paddingTop: '60px',
	marginBottom: '85px',
})

export const cancellationInfo = style({
	padding: '20px',
	display: 'flex',
	flexDirection: 'column',
	gap: '8px'
})