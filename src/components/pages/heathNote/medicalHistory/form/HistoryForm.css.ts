import { style } from "@vanilla-extract/css";

export const healthCheckFormContainer = style({
	paddingBottom: '85px',
})

export const healthCheckForm = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '20px',
	padding: '20px',
})

export const diagnosisItemList = style({
	display: 'flex',
	flexWrap: 'wrap',
	gap: '8px',
})

export const diagnosisItemCheckbox = style({
	width: 'auto !important',
	gap: '0 !important',
})