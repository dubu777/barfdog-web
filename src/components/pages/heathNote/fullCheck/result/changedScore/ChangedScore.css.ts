import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const changedScoreContainer = style({
	display: 'flex',
	flexDirection: 'column',
})

export const changedScoreNotice = style({
	marginTop: '12px',
	marginBottom: '6px',
	border: `1px solid ${themeVars.colors.gray.gray200}`
})

export const scoreInfo = style({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	marginTop: '2px',
})