import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const containerBaseStyle = style({
	position: 'fixed',
	width: '100%',
	maxWidth: '600px',
	display: 'flex',
	alignItems: 'center',
	padding: '20px',
	background: themeVars.colors.gray.gray0,
	borderTop: `1px solid ${themeVars.colors.gray.gray200}`,
	margin: '0 auto',
	maxWidth: "600px",
	bottom: 0,
	left: '50%',
	transform: 'translateX(-50%)',
})

export const containerStyle = {
	'full-button': style({
		justifyContent: 'center',
	}),
	'dual-button': style({
		justifyContent: 'space-between',
		gap: '8px',
	}),
	'text-button': style({
		justifyContent: 'space-between',
		gap: '16px',
	}),
}

export const buttonStyle = {
	sm: style({
		width: '25% !important',
	}),
	md: style({
		width: 'calc(100% / 2) !important',
	}),
	lg: style({
		width: '75% !important',
	}),
}
