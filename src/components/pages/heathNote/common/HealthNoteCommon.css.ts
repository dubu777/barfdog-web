import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";

export const petImage = recipe({
	base: {
		objectFit: 'cover',
	},
	variants: {
		borderRadius: {
			'md': {
				borderRadius: '8px',
			},
			'lg': {
				borderRadius: '50%',
			}
		},
		active: {
			true: {
				border: `2px solid ${themeVars.colors.red.red}`
			}
		}
	}
})