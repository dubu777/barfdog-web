import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";

export const barBox = style({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: '4px',
})

export const bar = recipe({
	base: {
		width: '32px',
		borderTopLeftRadius: '8px',
		borderTopRightRadius: '8px',
	},
	variants: {
		color: {
			gray300: {
				background: themeVars.colors.gray.gray300,
			},
			blue400: {
				background: themeVars.colors.blue.blue400,
			},
			pastelRed: {
				background: themeVars.colors.red.pastelRed,
			},
		}
	}
})

export const barChips = style({
	marginBottom: '4px',
})
