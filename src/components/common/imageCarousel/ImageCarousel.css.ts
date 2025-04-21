import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const previewSlider = style({
	width: '100%',
	display: 'flex',
	gap: '4px',
})

export const previewSlide = style({
	position: 'relative',
	borderRadius: '8px',
	overflow: 'hidden',
	selectors: {
		'&:first-child': {
			borderRadius: '6.667px',
			border: `1px solid ${themeVars.colors.red.red}`,
		}
	}
})

export const previewImage = style({
	objectFit: 'cover',
})

export const thumbnail = style({
	background: themeVars.colors.red.red,
	color: themeVars.colors.gray.gray0,
	borderRadius: '6.667px 0px',
	position: 'absolute !important',
	left: 0,
	top: 0,
	padding: '3px 6.67px',
})

export const removeButton = style({
	position: 'absolute',
	right: '0',
	top: '0',
	cursor: 'pointer'
})
