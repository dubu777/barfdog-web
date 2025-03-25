import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";

export const infoContainer= recipe({
	base: {
		padding: '20px',
		background: 'transparent',
		transition: 'all .35s',
		borderBottom: `2px solid ${themeVars.colors.gray.gray50}`
	},
	variants: {
		isOpen: {
			false: { background: themeVars.colors.gray.gray0 }
		}
	}
})

export const infoAccordion = style({
	display: 'flex',
	alignItems: 'center',
	gap: '8px'
})

export const infoAccordionButton = recipe({
	base: {
		background: 'transparent',
	},
	variants: {
		isOpen: {
			false: { background: themeVars.colors.gray.gray0 }
		}
	}
})

export const infoAccordionIcon = recipe({
	base: {
		transition: 'all .35s',
		transform: 'rotate(180deg)',
	},
	variants: {
		isOpen: {
			true: { transform: 'rotate(0deg)' }
		}
	}
})

export const infoDetailContainer = style({
	marginTop: '8px',
})

export const infoSubTitle = style({
	padding: '12px 0',
	marginBottom: '12px',
	borderBottom: `2px solid ${themeVars.colors.gray.gray900}`,
})

export const infoListBox = recipe({
	base: {
		display: 'flex',
		flexDirection: 'column',
		paddingBottom: '12px',
		marginBottom: '12px',
		borderBottom: `2px solid ${themeVars.colors.gray.gray100}`,
	},
	variants: {
		noBorder: {
			true: { borderBottom: 0, marginBottom: 0, paddingBottom: 0 },
		}
	}
})

export const infoListTitle = style({
	marginBottom: '10px',
})

export const infoList = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '8px',
})

export const infoCard = style({
	display: 'flex',
	flexDirection: 'column'
})

export const infoItem = style({
	width: '100%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between'
})

export const infoButtonControls = style({
	display: 'flex',
	alignItems: 'center',
	gap: '8px',
	marginTop: '12px',
})

export const receiptInfoContainer = style({
	background: themeVars.colors.gray.gray0,
	borderRadius: '8px',
})

export const receiptInfo = style({
	padding: 0,
})

export const petInfo = style({
	display: 'flex',
	gap: '12px',
	alignItems: 'center',
	marginBottom: '12px',
})

export const petImage = style({
	borderRadius: '8px',
	objectFit: 'cover',
})

export const petInfoText = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '4px',
})
