import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const datePickerButtonBox = recipe({
	base: {
		width: '100%',
		borderRadius: '8px',
		backgroundColor: themeVars.colors.gray.gray0,
		padding: '14px 20px',
		cursor: 'pointer',
		border: `1px solid ${themeVars.colors.gray.gray200}`,
	},
	variants: {
		isOpen: {
			true: {
				transition: 'all .35s',
			}
		},
		isMobile: {
			true: {}
		},
		isDisabled: {
			true: {
				border: `1px solid ${themeVars.colors.gray.gray300}`,
				backgroundColor: themeVars.colors.gray.gray200,

			}
		}
	},
	compoundVariants: [
		{
			variants: { isOpen: true, isMobile: true },
			style: {
				marginBottom: '60px',
			},
		},
	]
})

export const datePickerButton = style({
	width: '100%',
	textAlign: 'left',
	display: 'flex',
	justifyContent: 'space-between',
	cursor: 'pointer'
})
