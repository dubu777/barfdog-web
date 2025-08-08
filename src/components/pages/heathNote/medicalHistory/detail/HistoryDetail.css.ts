import { style } from "@vanilla-extract/css";

export const historyDetailContainer = style({
	padding: '20px',
	display: 'flex',
	flexDirection: 'column',
	gap: '16px',
	minHeight: 'calc(100vh - 52px)',
})

export const defaultInfo = style({
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	gap: '12px',
})

export const defaultInfoItem = style({
	display: 'flex',
	justifyContent: 'space-between',
})

export const defaultInfoLabel = style({
	minWidth: '68px',
})

export const moreButton = style({
	padding: '12px 0 12px 12px',
})
