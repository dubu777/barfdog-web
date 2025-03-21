import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const orderIssueInquiryContainer = style({
	minHeight: 'calc(100vh - 60px)',
	background: themeVars.colors.gray.gray50,
})

export const orderIssueTab = style({
	padding: '20px',
	background: themeVars.colors.gray.gray0,
})