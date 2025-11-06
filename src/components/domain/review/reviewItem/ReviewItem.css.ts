import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";

export const bestReviewModalContainer = style({
	paddingBottom: '85px',
})

export const contentBox = recipe({
	base: {
		width: '100%',
		padding: '20px',
		display: 'flex',
		flexDirection: 'column',
		gap: '16px',
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

export const contentReviewer = style({
	marginBottom: '6px',
})