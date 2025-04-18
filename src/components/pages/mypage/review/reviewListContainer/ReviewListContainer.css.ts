import { recipe } from "@vanilla-extract/recipes";
import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const reviewListContainer = recipe({
	base: {
		marginTop: '8px',
	},
	variants: {
		isEmpty: {
			true: {
				padding: '33px 20px 0',
			}
		}
	}
})

export const reviewList = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '8px'
})

export const infiniteTrigger = style({
	height: '72px',
	background: themeVars.colors.gray.gray50,
});