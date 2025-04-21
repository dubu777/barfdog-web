import { style } from "@vanilla-extract/css";

export const reviewDetailImageList = style({
	padding: '20px',
	width: '100%',
	position: 'relative',
})

export const reviewImageSlider = style({
	width: '100%',
	height: 'auto !important',
	position: 'relative',
	borderRadius: '8px',
})

export const reviewImage = style({
	position: 'static !important',
	width: '100%',
	aspectRatio: '1 / 1',
	objectFit: 'cover',
	borderRadius: '8px',
})

export const reviewImageCountChip = style({
	position: 'absolute !important',
	top: '16px',
	right: '16px',
})