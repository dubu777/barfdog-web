import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const subscriptionDetailContainer = style({
	minHeight: 'calc(100vh - 60px)',
	background: themeVars.colors.gray.gray50,
})

export const cancelSubscriptionContainer = style({
	padding: '12px 20px 60px',
	textAlign: 'left',
})