import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const userInfoContainer = style({
	padding: '20px',
	minHeight: 'calc(100vh - 60px)',
})

export const uploadProfile = style({
	marginTop: '10px',
	display: 'flex',
	flexDirection: 'column',
	gap: '10px',
	justifyContent: 'center',
	alignItems: 'center',
	marginBottom: '20px',
})

export const userInfoForm = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '20px',
	marginBottom: '20px'
})

export const userInfoReceiveTerms = style({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	gap: '20px',
	marginBottom: '40px',
})

export const userInfoButtonBox = style({
	width: '100%',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	position: 'fixed',
	bottom: 0,
	left: '50%',
	transform: 'translateX(-50%)',
	padding: '20px',
	borderTop: `1px solid ${themeVars.colors.gray.gray200}`,
	background: themeVars.colors.gray.gray0,
})