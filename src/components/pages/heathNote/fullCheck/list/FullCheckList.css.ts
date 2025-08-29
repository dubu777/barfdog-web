import { style } from "@vanilla-extract/css";

export const fullCheckEmptyList = style({
	height: 'calc(100vh - 52px)',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	gap: '20px',
})

export const createSurveyButton = style({
	width: '163px',
})

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
	padding: '0 20px 50px',
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