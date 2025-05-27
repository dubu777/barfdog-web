import { style } from "@vanilla-extract/css";

export const heathNoteHeaderContainer = style({
	padding: '6px 20px',
	display: 'flex',
	alignItems: 'center',
	gap: '8px',
})

export const selectButton = style({
	display: 'flex',
	alignItems: 'center',
	cursor: 'pointer'
})

export const selectBottomSheetHeader = style({
	width: '100%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: '20px 20px 8px',
})

export const selectBottomSheetBox = style({
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
})

export const selectDogButton = style({
	width: '100%',
	display: 'flex',
	justifyContent: 'space-between',
	padding: '12px 16px',
	height: 'auto',
	cursor: 'pointer',
})

export const selectBottomSheetDogInfo = style({
	display: 'flex',
	alignItems: 'center',
	gap: '8px',
})