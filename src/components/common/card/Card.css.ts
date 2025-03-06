import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const cardBaseStyle = style({
	borderRadius: '8px',
	background: themeVars.colors.gray.gray0,
})

export const cardShadow = {
	light: style({
		boxShadow: '-1px -1px 1px 0px rgba(255, 255, 255, 0.08) inset, 0px 0px 1px 0px rgba(0, 0, 0, 0.12), 0px 2px 4px 0px rgba(0, 0, 0, 0.08)',
	}),
	normal: style({
		boxShadow: '-1px -1px 2px 0px rgba(255, 255, 255, 0.08) inset, 0px 1px 4px 0px rgba(0, 0, 0, 0.08), 0px 2px 10px 0px rgba(0, 0, 0, 0.10)',
	}),
	strong: style({
		boxShadow: '-1px -1px 2px 0px rgba(255, 255, 255, 0.08) inset, 0px 1px 8px 0px rgba(0, 0, 0, 0.08), 0px 10px 20px 0px rgba(0, 0, 0, 0.10)',
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