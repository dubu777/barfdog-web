import { style } from "@vanilla-extract/css";

export const sliderContainer = style({
	width: '100%',
})

export const sliderBox = style({
	width: '100%',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	gap: '2px',
	margin: '16px 0 8px',
})

export const minMaxLevel = style({
	width: '100%',
	display: 'flex',
	justifyContent: 'space-between',
})