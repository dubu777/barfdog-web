import { style } from "@vanilla-extract/css";

export const defaultInfoContainer = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '16px',
})

export const tagChips = style({
	display: 'flex',
	alignItems: 'center',
	gap: '6px',
	marginBottom: '12px',
})

export const defaultInfoList = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '8px',
})

export const infoCard = style({
	display: 'flex',
	justifyContent: 'space-between',
})

export const infoCardLabel = style({
	display: 'flex',
	alignItems: 'center',
	gap: '4px',
	marginBottom: 'auto',
})

export const infoCardValue = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '6px',
})

export const infoValue = style({
	display: 'flex',
	justifyContent: 'flex-end',
	alignItems: 'center',
	gap: '8px',
})
