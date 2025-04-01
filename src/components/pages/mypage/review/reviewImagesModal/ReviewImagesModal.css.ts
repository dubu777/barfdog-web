import { style } from "@vanilla-extract/css";

export const reviewImageSlider = style({
	width: '100%',
	height: 'auto !important',
	position: 'relative',
})

export const reviewImage = style({
	position: 'static !important',
	width: '100%',
	maxHeight: '400px',
	objectFit: 'contain'
})