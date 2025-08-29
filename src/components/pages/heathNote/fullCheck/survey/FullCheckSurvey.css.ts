import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const fullCheckSurveyContainer = style({
	height: 'calc(100vh - 52px)'
})

export const fullCheckSurveyHeader = style({
	display: 'flex',
	alignItems: 'center',
	gap: '6px',
})

export const fullCheckSurveyTitle = style({
	padding: '40px 20px 20px',
	display: 'flex',
	flexDirection: 'column',
	gap: '12px',
})

export const surveyAnswerList = recipe({
	base: {
		padding: '20px',
		display: 'flex',
		flexDirection: 'column',
		gap: '12px',
	},
	variants: {
		flexWrap: {
			true: {
				flexDirection: 'row',
				flexWrap: 'wrap',
			}
		}
	}
})