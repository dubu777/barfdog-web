import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const cardBaseStyle = style({
	borderRadius: '8px',
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
}

export const cardPadding = {
	12: style({
		padding: '12px',
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