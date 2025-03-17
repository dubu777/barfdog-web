import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const dropdownContainerStyle = style({
	position: 'relative',
})

export const dropdownLabelStyle = style({
	display: 'flex',
	alignItems: 'center',
	gap: '4px',
})

export const dropdownBoxStyle = style({
	minWidth: '71px',
	position: 'absolute',
	padding: '12px',
	borderRadius: '8px',
	background: themeVars.colors.gray.gray0,
	display: 'flex',
	flexDirection: 'column',
	gap: '8px',
})

export const dropdownOptionStyle = style({
	textAlign: 'center',
	paddingBottom: '2px',
	borderBottom: `1px solid ${themeVars.colors.gray.gray300}`
})