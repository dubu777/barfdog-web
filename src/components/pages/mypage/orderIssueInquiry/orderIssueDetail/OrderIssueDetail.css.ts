import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const orderIssueDetailContainer = style({
	backgroundColor: themeVars.colors.gray.gray50,
})

export const orderIssueStatusContainer = style({
	backgroundColor: themeVars.colors.gray.gray0,
	padding: '20px',
})