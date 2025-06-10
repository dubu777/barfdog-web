import { style } from "@vanilla-extract/css";
import {recipe} from "@vanilla-extract/recipes";

export const imageList = recipe({
	base: {
		width: '100%',
		position: 'relative',
	},
	variants: {
		showPadding: {
			true: {
				padding: '20px',
			},
			false: {
				padding: 0,
			}
		}
	}
})

export const imageSlider = style({
	width: '100%',
	height: 'auto !important',
	position: 'relative',
	borderRadius: '8px',
})

export const image = style({
	// position: 'static !important',
	width: '100%',
	height: 'auto',
	aspectRatio: '1 / 1',
	objectFit: 'cover',
	borderRadius: '8px',
})

export const imageCountChip = style({
	position: 'absolute !important',
	top: '16px',
	right: '16px',
})