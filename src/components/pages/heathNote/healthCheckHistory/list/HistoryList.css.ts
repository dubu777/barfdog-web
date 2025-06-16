import { style } from "@vanilla-extract/css";

export const healthCheckListContainer = style({
	padding: '20px',
})

export const emptyBox = style({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: '20px',
	marginTop: '80px',
})

export const emptyTitle = style({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: '4px',
})

export const healthCheckList = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '8px',
	marginTop: '20px',
})

export const healthCheckInfo = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '8px',
})

export const tagList = style({
	display: 'flex',
	flexWrap: 'wrap',
	alignItems: 'center',
	gap: '4px',
})