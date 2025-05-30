import { style } from "@vanilla-extract/css";

export const createDogButton = style({
	padding: '20px',
})

export const dogList = style({
	padding: '0 20px',
	display: 'flex',
	flexDirection: 'column',
	gap: '12px',
})

export const dogCard = style({
	display: 'flex',
	gap: '12px',
	borderRadius: '12px !important'
})

export const dogInfo = style({
	width: 'calc(100% - 76px)',
	display: 'flex',
	flexDirection: 'column',
	gap: '2px',
})

export const dogInfoTop = style({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
})

export const dogName = style({
	display: 'flex',
	alignItems: 'center',
	gap: '6px',
})

export const dogType = style({
	display: 'flex',
	alignItems: 'center',
	gap: '4px',
})
