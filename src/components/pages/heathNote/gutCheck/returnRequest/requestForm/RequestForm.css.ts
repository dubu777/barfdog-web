import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const requestFormBox = recipe({
	base: {
		padding: '32px 20px',
		display: 'flex',
		flexDirection: 'column',
	},
	variants: {
		gap: {
			8: {
				gap: '8px',
			},
			16: {
				gap: '16px',
			},
			20: {
				gap: '20px',
			},
		}
	}
})

export const requestFormNotice = style({
	margin: '0 0 20px',
})