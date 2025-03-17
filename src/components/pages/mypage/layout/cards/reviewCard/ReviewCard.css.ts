import {style} from "@vanilla-extract/css";
import {themeVars} from "@/styles/theme.css";

export const reviewContainerStyle = style({
	padding: '20px',
	background: themeVars.colors.gray.gray0,
})

export const reviewStatusStyle = style({
	display: 'flex',
	alignItems: 'center',
	gap: '4px',
})

export const reviewInfoStyle = style({
	display: 'flex',
	gap: '16px',
	margin: '12px 0'
})

export const reviewImageStyle = style({
	width: '76px',
	height: '76px',
	borderRadius: '8px',
	background: '#eee',
})

export const reviewInfoTextStyle = style({
	width: 'calc(100% - 92px)',
	display: 'flex',
	flexDirection: 'column',
	gap: '4px',
})

export const reviewActionsStyle = style({
	width: '100%',
	display: 'flex',
	gap: '8px',
	marginTop: '12px',
})