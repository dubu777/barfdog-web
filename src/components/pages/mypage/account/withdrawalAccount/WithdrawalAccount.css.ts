import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/styles/theme.css";

export const withdrawalContainerBox = recipe({
	base: {
		padding: '60px 20px 40px',
	},
	variants: {
		type: {
			guide: {},
			reason: {
				padding: '0 0 40px'
			},
			confirmation: {},
		},
	}
})

export const withdrawalContainerTitle = recipe({
	base: {
		display: 'flex',
		flexDirection: 'column',
		gap: '4px',
		paddingBottom: '40px',
	},
	variants: {
		type: {
			guide: {
				marginBottom: '40px',
				borderBottom: `2px solid ${themeVars.colors.gray.gray900}`,
			},
			reason: {
				padding: '0 20px 40px'
			},
			confirmation: {
				marginBottom: '20px',
				borderBottom: `2px solid ${themeVars.colors.gray.gray900}`,
			},
		},
	}
})

export const guideTitle = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '4px',
	marginBottom: '40px',
})

export const guideCard = style({
	marginTop: '10px !important'
})

export const dogCount = style({
	display: 'flex',
	alignItems :'center',
	justifyContent: 'space-between',
	marginBottom: '10px',
})

export const dogCardItem = style({
	display: 'flex',
	gap: '12px',
	borderTop: `1px solid ${themeVars.colors.gray.gray400}`,
	padding: '16px 0',
	selectors: {
		'&:first-child': {
			padding: '0 0 16px',
			borderTop: 'unset',
		},
		'&:last-child': {
			padding: '16px 0 0',
		},
	}
})

export const dogCardInfo = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '4px',
})

export const dogCardImage = style({
	objectFit: 'cover',
	borderRadius: '8px',
})

export const reasonCheckboxList = style({
	backgroundColor: themeVars.colors.gray.gray0,
	padding: '40px 20px',
	display: 'flex',
	flexDirection: 'column',
	gap: '12px',
})

export const otherReasonTextarea = style({
	marginTop: '10px',
})

