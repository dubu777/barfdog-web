import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";
import { recipe } from "@vanilla-extract/recipes";

export const sectionBox = recipe({
	base: {
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: themeVars.colors.gray.gray0,
	},
	variants: {
		background: {
			pinkWhite: {
				backgroundColor: themeVars.colors.red.pinkWhite,
			}
		}
	}
})

export const sectionTitle = recipe({
	base: {
		display: 'flex',
		flexDirection: 'column',
		gap: '12px',
	},
	variants: {
		padding: {
			'60/20/28': {
				padding: '60px 20px 28px',
			},
			'0/20': {
				padding: '0 20px',
			}
		}
	}
})

export const sectionContent = style({
	padding: '60px 20px',
})

export const snsContainer = style({
	padding: '0 0 28px',
	position: 'relative',
	display: 'flex',
	flexDirection: 'column',
	gap: '28px',
})

export const snsTopImageText = style({
	width: '100%',
	position: 'absolute',
	top: '60px',
	left: '50%',
	transform: 'translateX(-50%)',
	display: 'flex',
	flexDirection: 'column',
	gap: '6px',
	justifyContent: 'center',
	alignItems: 'center',
})

export const snsList = style({
	paddingTop: '18px',
	position: 'relative',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	gap: '20px',
	selectors: {
		'&:after': {
			content: '',
			display: 'block',
			width: '40px',
			height: '2px',
			backgroundColor: themeVars.colors.gray.gray300,
			position: 'absolute',
			top: 0,
			left: '50%',
			transform: 'translateX(-50%)',
		}
	}
})
