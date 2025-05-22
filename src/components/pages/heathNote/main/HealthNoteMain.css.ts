import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";
import { recipe } from "@vanilla-extract/recipes";

export const heathNoteMainContainer = style({
	background: themeVars.colors.gray.gray50,
	height: 'calc(100vh - 52px)',
	padding: '20px 20px 64px',
})

export const menuCategoryBox = style({
	display: 'grid',
	gridTemplateColumns: 'repeat(2, 1fr)',
	gap: '12px'
})

export const menuCategory = recipe({
	base: {
		display: 'flex',
	},
	variants: {
		fullWidth: {
			true: {
				gridColumn: 'span 2',
			},
		}
	}
})

export const menuCategoryCard = recipe({
	base: {
		display: 'flex',
	},
	variants: {
		fullWidth: {
			true: {
				flexDirection: 'row',
				justifyContent: 'space-between',
			},
			false: {
				flexDirection: 'column',
				gap: '32px',
			}
		}
	}
})

export const menuDescription = style({
	marginTop: '4px'
})

export const menuImage = style({
	marginLeft: 'auto'
})