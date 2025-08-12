import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const kitGuideContainer = style({
	backgroundColor: themeVars.colors.gray.gray0,
})

export const kitGuideHeader = style({
	padding: '40px 20px 20px',
})

export const kitGuideImage = style({
	width: '100%',
	height: 'auto',
	objectFit: 'contain',
})

export const bundledItemListBox = style({
	padding: '20px 20px 40px',
	display: 'flex',
	flexDirection: 'column',
	gap: '8px'
})

export const bundledItemList = style({
	display: 'flex',
	flexWrap: 'wrap',
	gap: '4px 12px',
})

export const kitGuideStep = style({
	backgroundColor: themeVars.colors.gray.gray50,
	padding: '40px 20px',
	display: 'flex',
	flexDirection: 'column',
	gap: '12px'
})

export const kitGuideStepContent = style({
	maxWidth: '70%',
	display: 'flex',
	flexDirection: 'column',
})

export const kitGuideStepTitle = style({
	margin: '8px 0 4px'
})

export const createButton = style({
	marginTop: '16px',
})

export const kitGuideNotice = style({
	padding: '32px 20px',
	backgroundColor: themeVars.colors.gray.gray0,
})