import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const previewSlider = style({
	width: '100%',
	display: 'flex',
	gap: '4px',
})

export const previewSlide = style({
	borderRadius: '8px',
	overflow: 'hidden',
	selectors: {
		'&:first-child': {
			border: `1px solid ${themeVars.colors.red.red}`,
		}
	}
})

export const previewImage = style({
	objectFit: 'cover',
})

export const removeButton = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: '20px',
	height: '20px',
	position: 'absolute',
	right: '5px',
	top: '5px',
	background: '#fff',
	padding: '5px',
	borderRadius: '50%',
	cursor: 'pointer'
})
