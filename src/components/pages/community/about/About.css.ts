import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";
import { recipe } from "@vanilla-extract/recipes";

export const aboutContainer = style({
	backgroundColor: themeVars.colors.gray.gray0,
})

export const sectionBox = recipe({
	base: {
		padding: '60px 0 28px',
		display: 'flex',
		flexDirection: 'column',
		gap: '28px',
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

export const sectionTitle = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '12px',
	padding: '0 20px',
})

export const sectionImage = style({
	width: '100%',
	height: 'auto',
	objectFit: 'cover',
})

export const sectionContent = style({
	padding: '0 20px',
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
	padding: '0 20px',
})

export const sectionDescription = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '6px',
})

export const snsBox = style({
	padding: '28px 0 60px',
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
