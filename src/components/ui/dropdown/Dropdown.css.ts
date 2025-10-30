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
	gap: '4px',
	zIndex: '100'
})

export const dropdownOptionStyle = style({
	textAlign: 'center',
	padding: '6px 0',
	borderBottom: `1px solid ${themeVars.colors.gray.gray300}`,
})