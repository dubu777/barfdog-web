import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";

export const selectContainerStyle = style({
	position: 'relative',
})

export const selectLabelStyle = recipe({
	base: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderRadius: '8px',
		border: `1px solid ${themeVars.colors.gray.gray200}`,
		padding: '12px 20px'
	},
	variants: {
		isOpen: {
			true: {
				borderBottomLeftRadius: 0,
				borderBottomRightRadius: 0,
				borderBottom: 0,
			}
		}
	}
})

export const labelArrowIconStyle = recipe({
	base: {
		transform: 'rotate(90deg)',
		transition: 'all .35s'
	},
	variants: {
		isOpen: {
			true: {
				transform: 'rotate(270deg)',
			}
		}
	}
})

export const selectDropdownStyle = style({
	borderBottomLeftRadius: '8px',
	borderBottomRightRadius: '8px',
	border: `1px solid ${themeVars.colors.gray.gray200}`,
})

export const selectDropdownOptionStyle = style({
	padding: '12px 20px',
	borderBottom: `1px solid ${themeVars.colors.gray.gray200}`,
	cursor: 'pointer',
})

export const customInputStyle = style({
	width: '100%',
	color: themeVars.colors.gray.gray600,
})

export const selectDropdownFloatingStyle = style({
	position: 'absolute',
	backgroundColor: themeVars.colors.gray.gray0,
	width: '100%',
	maxHeight: '255px',
	overflow: 'scroll',
})
