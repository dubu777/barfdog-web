import { style } from "@vanilla-extract/css";

export const filterBottomSheetContainer = style({
	padding: '20px 12px 12px 20px',
	display: 'flex',
	flexDirection: 'row-reverse',
})

export const filterBottomSheet = style({
	width: '100%',
	padding: '15px 20px 20px',
	marginBottom: '80px',
})

export const filterBottomSheetOptions = style({
	display: 'flex',
	flexDirection :'column',
	gap: '20px',
	marginTop: '31px',
})

export const filterOptionBox = style({
	display: 'flex',
	flexDirection: 'column'
})

export const filterOption = style({
	display: 'grid',
	gap: '10px 8px',
	marginTop: '10px',
})