import { style } from "@vanilla-extract/css";

export const fullCheckSurvey = style({
	padding: '20px 20px 16px'
})

export const fullCheckSurveyCardContent = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '4px',
	padding: '12px 0 12px 12px',
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