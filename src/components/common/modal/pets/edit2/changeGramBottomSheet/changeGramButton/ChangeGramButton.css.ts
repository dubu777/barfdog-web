import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const changeGramButtonWrapper = recipe({
	base: {
		width: '100%',
	},
	variants: {
		isChecked: {
			true: {
				border: `1px solid ${themeVars.colors.red.red}`,
				backgroundColor: `${themeVars.colors.red.pinkWhite} !important`,
			},
			false: {
				border: `1px solid ${themeVars.colors.gray.gray200}`,
				backgroundColor: `${themeVars.colors.gray.gray0} !important`,
			}
		}
	}
})

export const changeGramButton = style({
	width: '100%',
	height: '100%',
	flexDirection: 'column',
	gap: '4px !important'
})

export const changeGramIcon = style({
	marginLeft: 'auto',
	marginTop: 'auto',
})