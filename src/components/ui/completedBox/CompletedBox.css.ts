import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const completedBox = recipe({
	base: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		gap: '12px',
	},
	variants: {
		padding: {
			0: {
				padding: '0',
			},
			'60/20': {
				padding: '60px 20px',
			},
		}
	}
})

export const completedBoxInfo = style({
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	gap: '4px',
})
