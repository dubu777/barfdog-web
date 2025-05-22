import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const cardBaseStyle = style({
	background: themeVars.colors.gray.gray0,
})

export const cardShadow = {
	light: style({
		boxShadow: themeVars.shadow.light,
	}),
	normal: style({
		boxShadow: themeVars.shadow.normal,
	}),
	strong: style({
		boxShadow: themeVars.shadow.strong,
	}),
	none: style({
		boxShadow: 'none',
	}),
}

export const cardPadding = {
	12: style({
		padding: '12px',
	}),
	16: style({
		padding: '16px',
	}),
	20: style({
		padding: '20px',
	}),
}

export const cardAlign = {
	left: style({
		textAlign: 'left',
	}),
	center: style({
		textAlign: 'center',
	}),
}

export const cardBorderRadius = {
	default: style({
		borderRadius: '8px',
	}),
	none: style({
		borderRadius: 0,
	}),
	'12': {
		borderRadius: '12px',
	}
}