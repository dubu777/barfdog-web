import { style } from "@vanilla-extract/css";

export const userInfoContainer = style({
	marginBottom: '100px'
})

export const userInfoReceiveTerms = style({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	gap: '20px',
	margin: '20px 0 40px'
})

export const userInfoButtons = style({
	width: '60%',
	margin: '0 auto',
	display: 'flex',
	gap: '10px',
	justifyContent: 'center',
	alignItems: 'center',
})