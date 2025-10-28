import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";
import { recipe } from "@vanilla-extract/recipes";

export const aboutContainer = style({
	backgroundColor: themeVars.colors.gray.gray0,
})

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

export const signatureBox = style({
	display: 'flex',
	gap: '20px',
	alignItems: 'flex-end',
	justifyContent: 'flex-end',
})

export const ourProcessBox = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '20px',
})

export const ourProcessTitle = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '12px',
})

export const sectionDescription = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '6px',
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

export const snsBox = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '40px',
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
