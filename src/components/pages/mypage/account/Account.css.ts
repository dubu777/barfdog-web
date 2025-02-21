import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const accountContainer = style({
	display: 'flex',
	flexDirection: 'column',
})

export const accountLink = style({
	display: 'flex',
	justifyContent: 'space-between',
	padding: '20px',
	borderBottom: `1px solid ${themeVars.borderColors.greyDD}`
})

export const arrowIcon = style({
	transform: 'rotate(180deg)'
})

export const accountForm = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '16px',
	margin: '0 auto',
	width: '90%',
})

export const accountInputBox = style({
	width: '100%',
	display: 'flex',
	gap: '16px',
	alignItems: 'center',
})

export const accountLabel = style({
	width: '30%',
	fontSize: '15px'
})

export const accountInput = style({
	width: '70%',
})

export const accountSubmitButton = style({
	margin: '0 auto',
	width: '30%',
	display: 'flex',
	gap: '16px',
})

export const connectedSnsContainer = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '20px',
	background: themeVars.backgroundColors.greyF7,
	padding: '20px',
	borderRadius: '8px',
})

export const connectedSns = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	gap: '10px'
})

export const disconnectSnsSubmit = style({
	width: '30%',
	margin: '20px auto 0',
})