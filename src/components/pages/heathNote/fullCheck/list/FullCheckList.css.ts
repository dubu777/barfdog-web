import { style } from "@vanilla-extract/css";

export const fullCheckSurvey = style({
	padding: '10px 20px 16px'
})

export const fullCheckSurveyCard = style({
	display: 'flex',
	padding: '0 !important',
	justifyContent: 'space-between',
})

export const fullCheckSurveyCardContent = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '4px',
	padding: '12px 0 12px 12px',
})

export const fullCheckSurveyButton = style({
	display: 'flex',
	alignItems: 'center',
	gap: '4px',
	padding: '6px 0',
	cursor: 'pointer',
})

export const fullCheckResultList = style({
	padding: '0 20px',
	display: 'flex',
	flexDirection: 'column',
	gap: '8px',
})

export const resultTopRank = style({
	margin: '8px 0 12px',
	display: 'flex',
	alignItems: 'center',
	gap: '8px',
})