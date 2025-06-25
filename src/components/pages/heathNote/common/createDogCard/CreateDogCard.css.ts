import { style } from "@vanilla-extract/css";

export const imageBox = style({
	width: '100%',
	height: '188px',
	display: 'flex',
	justifyContent: 'center',
	overflow: 'hidden',
})

export const phoneImage = style({
	width: '112px',
	height: 'auto',
	objectFit: 'contain',
})