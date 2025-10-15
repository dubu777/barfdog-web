import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";

export const contentBox = recipe({
	base: {
		padding: '20px',
		display: 'flex',
		flexDirection: 'column',
		gap: '20px',
		transition: 'all .35s',
	},
	variants: {
		background: {
			gray50: {
				background: themeVars.colors.gray.gray50,
			},
			white: {
				background: themeVars.colors.gray.gray0,
			}
		},
		isExpanded: {
			true: {
			},
			false: {
				cursor: 'pointer',
			}
		}
	}
})

export const contentTop = recipe({
	base: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
	},
	variants: {
		isExpanded: {
			true: {
				cursor: 'pointer',
			}
		}
	}
})

export const username = style({
	marginBottom: '6px',
})

export const contentBottom = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '20px',
})

export const contents = style({
	display: 'flex',
	alignItems: 'center',
	gap: '4px'
})