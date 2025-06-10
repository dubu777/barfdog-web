import { recipe } from "@vanilla-extract/recipes";
import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const switchButton = recipe({
	base: {
		width: 52,
		height: 32,
		backgroundColor: themeVars.colors.gray.gray500,
		borderRadius: '100px',
		cursor: "pointer",
		display: "flex",
		padding: 4,
		transition: 'all .35s'
	},
	variants: {
		isOn: {
			true: {
				justifyContent: 'flex-end',
				backgroundColor: themeVars.colors.red.red,
			},
			false: {
				justifyContent: 'flex-start',
			}
		}
	}
})

export const switchHandle = style({
	width: 24,
	height: 24,
	backgroundColor: themeVars.colors.gray.gray0,
	borderRadius: "50%",
})