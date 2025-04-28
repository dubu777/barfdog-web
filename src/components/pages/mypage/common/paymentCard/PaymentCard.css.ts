import { style } from "@vanilla-extract/css";

export const card = style({
	width: '100%',
	aspectRatio: '183 / 100',
	borderRadius: '8px',
	overflow: 'hidden',
})

export const cardBottom = style({
	width: '100%',
	height: '27.3%',
	background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), linear-gradient(180deg, rgba(153, 153, 153, 0.20) 0%, rgba(255, 255, 255, 0.20) 100%)',
	backgroundBlendMode: 'normal, multiply',
	padding: '8px 16px',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
})

export const cardInfo = style({
	height: 'calc(100% - 27.3%)',
	padding: '16px',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between'
})

export const cardChip = style({
	marginLeft: 'auto',
})

export const smallCardBox = style({
	display: 'flex',
	gap: '16px',
	alignItems: 'center',
	padding: '16px 0',
})

export const smallCardInfo = style({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
})

