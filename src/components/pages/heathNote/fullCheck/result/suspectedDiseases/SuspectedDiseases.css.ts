import { style } from "@vanilla-extract/css";

export const diseaseListContainer = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '20px',
})

export const diseaseList = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '12px',
})

export const diseaseAccordionHeader = style({
	display: 'flex',
	alignItems: 'center',
})

export const diseaseCategorySvg = style({
	marginLeft: '8px',
	marginRight: '12px',
})

export const diseaseItem = style({
	display: 'flex',
	gap: '12px',
})

export const diseaseItemLabel = style({
	minWidth: '24px',
})