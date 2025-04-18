import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const autoRewardSwitch = style({
	width: '100%',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: '16px 20px',
	borderTop: `1px solid ${themeVars.colors.gray.gray200}`,
	background: themeVars.colors.gray.gray0
})

export const autoRewardInfo = style({
	padding: '20px',
})