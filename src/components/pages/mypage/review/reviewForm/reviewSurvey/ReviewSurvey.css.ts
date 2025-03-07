import { style } from "@vanilla-extract/css";
import { themeVars } from "@/styles/theme.css";

export const reviewSurveyContainer = style({
	background: themeVars.colors.gray.gray0,
	marginBottom: '4px',
	paddingBottom: '20px',
})

export const reviewSurveyBox = style({
	padding: '20px 0'
})

export const surveyIconBox = style({
	marginTop: '16px',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	gap: '34px',
})

export const petCareTypeBox = style({
	marginBottom: 0,
})

export const petCareTypeTitle = style({
	textAlign: 'left',
	padding: '0 20px 20px',
	display: 'flex',
	alignItems: 'center',
	gap: '4px'
})

export const petCareTypeSelectBox = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '8px'
})
