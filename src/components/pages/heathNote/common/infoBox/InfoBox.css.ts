import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";
import { recipe } from "@vanilla-extract/recipes";

export const infoBox = recipe({
	base: {
		width: '50%',
		display: 'flex',
		flexDirection: 'column',
		gap: '4px',
		padding: '12px 16px',
		selectors: {
			'&:first-child': {
				borderRight: `1px solid ${themeVars.colors.gray.gray100}`
			}
		}
	},
	variants: {
		align: {
			center: {
				alignItems: 'center',
			},
			start: {},
		}
	}
})

export const infoContent = style({
	display: 'flex',
	alignItems: 'center',
	gap: '4px',
})

export const infoContentAlignStart = style({
	marginLeft: 'auto',
})