import { style } from "@vanilla-extract/css";

export const breedDefaultInfo = style({
	display: 'flex',
	flexDirection: 'column',
	gap: '16px',
})

export const breedImage = style({
	width: '100%',
	height: 'auto',
	objectFit: 'cover',
	borderRadius: '16px',
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

export const infoCardLabel = style({
	display: 'flex',
	alignItems: 'center',
	gap: '4px',
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

export const lifeExpectancy = style({
	display: 'flex',
	alignItems: 'center',
	gap: '4px',
})